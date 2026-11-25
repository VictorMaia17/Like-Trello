import {
    setItemStorage,
    removeItemStorage,
    getItemStorage
} from "./localStorage";

const AUTH_TOKEN_KEY = "auth_token";

export const setAuthToken = (token) => setItemStorage(AUTH_TOKEN_KEY, token);

export const getAuthToken = () => getItemStorage(AUTH_TOKEN_KEY);

export const removeAuthToken = () => removeItemStorage(AUTH_TOKEN_KEY);
