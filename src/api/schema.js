import client from './http-client';
const endpoint = 'schema';

export const getDataSchemas = (params, callback, errCallback) => {
    client.get(endpoint, { params })
        .then(res => {
            if(callback) callback(res);
        })
        .catch(e => {
            if(errCallback) errCallback(e);
        });
};

export const insertSchema = (params, callback, errCallback) => {
    client.post(endpoint, params)
        .then(res => {
            if(callback) callback(res);
        })
        .catch(e => {
            if (errCallback) errCallback(e);
        });
};

export const updateSchema = (params, callback, errCallback) => {
    client.put(`${endpoint}/${params.id}`, params)
        .then(res => {
            if (callback) callback(res);
        })
        .catch(e => {
            if (errCallback) errCallback(e);
        })
};

export const deleteSchema = (params, callback, errCallback) => {
    client.delete(`${endpoint}/${params.id}`)
        .then(res => {
            if (callback) callback(res);
        })
        .catch(e => {
            if (errCallback) errCallback(e);
        })
};
