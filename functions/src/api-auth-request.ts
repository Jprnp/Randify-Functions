import * as common from './api-common';

const request = require('request');

export const spotifyRequest = (params: any) => {
    return new Promise((resolve, reject) => {
        request.post(common.API_URL, {
            form: params,
            headers: {
                "Authorization": "Basic " + new Buffer(common.CLIENT_ID + ":" + common.CLIENT_SECRET).toString('base64')
            },
            json: true
        }, (err: any, resp: any) => err ? reject(err) : resolve(resp));
    })
        .then((resp: any) => {
            if (resp.statusCode != 200) {
                return Promise.reject({
                    statusCode: resp.statusCode,
                    body: resp.body
                });
            }
            return Promise.resolve(resp.body);
        })
        .catch(err => {
            return Promise.reject({
                statusCode: 500,
                body: JSON.stringify({})
            });
        });
};
