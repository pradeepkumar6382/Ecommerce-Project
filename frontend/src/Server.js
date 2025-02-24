import axios from "axios";

const Server = axios.create({
    baseURL: "http://localhost:8000",
});

Server.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
     (error)=> {
        if (error.response && error.response.status === 401) {
            if (error.response.data.message === "Token expired") {
                console.warn("Token expired, redirecting to login...");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}}
        
);

export default Server;
