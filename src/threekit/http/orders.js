import threekitRequest from './request';

const ORDERS_API_ROUTE = '/api/orders';

export const postOrder = (data) => {
  let error;
  if (!data) error = 'Requires Order Data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'POST',
    url: ORDERS_API_ROUTE,
    data,
  });
};

export const fetchOrder = (id) => {
  let error;
  if (!id) error = 'Requires an Order ID / ShortID';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'GET',
    url: `${ORDERS_API_ROUTE}/${id}`,
    params: { fullConfiguration: true },
  });
};

export const queryOrder = (query) => {
  let error;
  if (!query) error = 'Get Order is missing query params';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'GET',
    url: ORDERS_API_ROUTE,
    params: query,
  });
};

export const editOrder = (id, data) => {
  let error;
  if (!id) error = 'Requires an order ID / shortId';
  if (!data) error = 'Requires updated cart data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'PUT',
    url: ORDERS_API_ROUTE,
    params: query,
  });
};

export const deleteOrder = (id, data) => {
  let error;
  if (!id) error = 'Requires an order ID / shortId';
  if (!data) error = 'Requires updated cart data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'PUT',
    url: ORDERS_API_ROUTE,
    params: query,
  });
};
