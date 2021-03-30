import threekitApi from './api';
import react from './react';
export * from './react';

export const player = threekitApi.player;
export const threekit = threekitApi;

const api = { player, threekit, ...react };

export default api;
