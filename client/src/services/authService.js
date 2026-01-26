import api from "./api";

const authService = {
    async login(email, password) {
        const res = await api.post("/login", { email, password });
        localStorage.setItem("token", res.data.token);
        return res.data;
    },

    async register(userData) {
        const res = await api.post("/auth/register", userData);
        return res.data;
    },

    async logout() {
        localStorage.removeItem("token");
    },
};

export default authService;
