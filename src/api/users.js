// import { axiosHit } from '@/helpers/helpers';
import client from './http-client';

const endpoint = 'users';

export const getDataUsers = (params, callback, errCallback) => {
    client.get(endpoint, { params })
        .then(res => {
            if(callback) callback(res);
        })
        .catch(e => {
            if(errCallback) errCallback(e);
        });
};

export const createUsers = (params, callback, errCallback) => {
    client.post(endpoint, params)
        .then(res => {
            if(callback) callback(res);
        })
        .catch(e => {
            if(errCallback) errCallback(e);
        });
};

export const updateUsers = (params, callback, errCallback) => {
	client.put(`${endpoint}/${params.id}`, params)
		.then(res => {
			if (callback) callback(res);
		})
		.catch(e => {
			if (errCallback) errCallback(e);
		})
};

export const deleteUser = (params, callback, errCallback) => {
	client.delete(`${endpoint}/${params.id}`)
		.then(res => {
			if (callback) callback(res);
		})
		.catch(e => {
			if (errCallback) errCallback(e);
		})
};
