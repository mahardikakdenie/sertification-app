import client from '@/api/http-client.js';
import { axiosHit } from '@/helpers/helpers';

const endpoint = 'users';

export const getDataUsers = (params, callback, errCallback) => {
	axiosHit(endpoint, params, 'get', callback, errCallback);
};

export const ee = () => {};
