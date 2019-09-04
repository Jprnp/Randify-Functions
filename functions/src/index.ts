import * as functions from 'firebase-functions';
import * as common from './api-common';
import * as apiAuth from './api-auth-request';

export const getEnvConfig = functions.https.onRequest((req, res) => {
    return res.json({
        "clientId": common.CLIENT_ID,
        "clientSecret": common.CLIENT_SECRET,
        "callbackUrl": common.CLIENT_CALLBACK_URL
    })
});

// @ts-ignore
export const exchange = functions.https.onRequest((req, res) => {
    const params = req.body;
    if (!params.code) {
        return res.json({
            "error": "Parameter missing"
        });
    }

    apiAuth.spotifyRequest({
        grant_type: "authorization_code",
        redirect_uri: common.CLIENT_CALLBACK_URL,
        code: params.code
    })
        .then(session => {
            let result = {
                "access_token": session.access_token,
                "expires_in": session.expires_in,
                "refresh_token": common.encrypt(session.refresh_token)
            };
            return res.send(result);
        })
        .catch(response => {
            return res.json(response);
        });
});

// @ts-ignore
export const refresh = functions.https.onRequest((req, res) => {
    const params = req.body;
    if (!params.refresh_token) {
        return res.json({
            "error": "Parameter missing"
        });
    }

    apiAuth.spotifyRequest({
        grant_type: "refresh_token",
        refresh_token: common.decrypt(params.refresh_token)
    })
        .then(session => {
            return res.send({
                "access_token": session.access_token,
                "expires_in": session.expires_in
            });
        })
        .catch(response => {
            return res.json(response);
        });
});


