import * as functions from "firebase-functions";

const API_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = functions.config().spotifyapi.id;
const CLIENT_SECRET = functions.config().spotifyapi.secret;
const CLIENT_CALLBACK_URL = functions.config().spotifyapi.callback_url;
const ENCRYPTION_SECRET = functions.config().spotifyapi.encryption_secret;

const crypto = require('crypto-js');

// Helper functions
function encrypt(text : string) {
    return crypto.AES.encrypt(text, ENCRYPTION_SECRET).toString();
}

function decrypt(text : string) {
    const bytes = crypto.AES.decrypt(text, ENCRYPTION_SECRET);
    return bytes.toString(crypto.enc.Utf8);
}

export { API_URL, CLIENT_ID, CLIENT_SECRET, CLIENT_CALLBACK_URL, ENCRYPTION_SECRET, encrypt, decrypt }
