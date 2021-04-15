import api from './api';
import react from './react';
export * from './api';
export * from './react';

export const { ThreekitProvider } = react.components;

export default { ...api, ...react, ThreekitProvider };
