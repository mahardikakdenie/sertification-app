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
