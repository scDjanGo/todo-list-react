import axios from "axios";

const URL = "https://672282882108960b9cc4b2e2.mockapi.io/auth/";
const API = axios.create({
    baseURL: URL,
});

const AUTHAPI = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    }
});


export default API;
export { AUTHAPI };
