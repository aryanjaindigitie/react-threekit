import { threekitRequest } from './utils';

const DATATABLES_API_ROUTE = `/api/datatables`;

export const getDatatablesList = () =>
  threekitRequest({
    method: 'GET',
    url: DATATABLES_API_ROUTE,
    includeOrgId: true,
  });

export const getDatatableInfo = (datatableId) => {
  if (!datatableId) throw new Error('Requires Datatable ID');
  return threekitRequest({
    method: 'GET',
    url: `${DATATABLES_API_ROUTE}/${datatableId}`,
    includeOrgId: true,
  });
};

export const getDatatableData = (datatableId) => {
  if (!datatableId) throw new Error('Requires Datatable ID');
  return threekitRequest({
    method: 'GET',
    url: `${DATATABLES_API_ROUTE}/${datatableId}/rows`,
    includeOrgId: true,
  });
};

export const getDatatable = (datatableId) => {
  if (!datatableId) throw new Error('Requires Datatable ID');
  return threekitRequest({
    method: 'GET',
    url: `${DATATABLES_API_ROUTE}/${datatableId}/download`,
    includeOrgId: true,
  });
};

export const postDatatable = (formData) => {
  if (!formData) throw new Error('Requires DataTable Form');
  return threekitRequest({
    method: 'POST',
    url: DATATABLES_API_ROUTE,
    formData,
  });
};

export const putDatatable = (datatableId, formData) => {
  if (!datatableId) throw new Error('Requires DataTable ID');
  if (!formData) throw new Error('Requires DataTable Form');
  return threekitRequest({
    method: 'PUT',
    url: `${DATATABLES_API_ROUTE}/${datatableId}`,
    formData,
  });
};
