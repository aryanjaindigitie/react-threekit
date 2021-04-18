import { threekitRequest } from './utils';

const DATATABLES_API_ROUTE = `/api/datatables`;

export const getDatatablesList = (orgId) => {
  if (!orgId) throw new Error('Requires Org ID');
  return threekitRequest({
    method: 'GET',
    url: DATATABLES_API_ROUTE,
    params: { orgId },
  });
};

export const getDatatableInfo = (datatableId, orgId) => {
  if (!datatableId) throw new Error('Requires Datatable ID');
  return threekitRequest({
    method: 'GET',
    url: `${DATATABLES_API_ROUTE}/${datatableId}`,
    params: { orgId },
  });
};

export const getDatatableData = (datatableId, orgId) => {
  if (!datatableId) throw new Error('Requires Datatable ID');
  return threekitRequest({
    method: 'GET',
    url: `${DATATABLES_API_ROUTE}/${datatableId}/rows`,
    params: { orgId },
  });
};

export const getDatatable = (datatableId, orgId) => {
  if (!datatableId) throw new Error('Requires Datatable ID');
  return threekitRequest({
    method: 'GET',
    url: `${DATATABLES_API_ROUTE}/${datatableId}/download`,
    params: { orgId },
  });
};

export const postDatatable = (formData) => {
  if (!formData) throw new Error('Requires DataTable Form');
  return threekitRequest({
    method: 'POST',
    url: DATATABLES_API_ROUTE,
    data: formData,
    config: {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    },
  });
};

export const putDatatable = (datatableId, formData) => {
  if (!formData) throw new Error('Requires DataTable Form');
  return threekitRequest({
    method: 'PUT',
    url: `${DATATABLES_API_ROUTE}/${datatableId}`,
    data: formData,
    config: {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    },
  });
};
