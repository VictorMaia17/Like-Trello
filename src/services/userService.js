import api from "./api";

export async function registerUser(userData){

    const response = await api.post("/users", userData);
    return response.data;

}

export async function loginUser(loginRequest){

    const response = await api.post("/auth/login", loginRequest);
    return response.data;

}