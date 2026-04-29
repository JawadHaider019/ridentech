import api from "./api";

// LOGIN
export const adminLogin = async (email, password) => {
    const res = await api.post('admin/login', { email, password });
    return res.data;
};
export const adminLogout = async () => {
    const res = await api.post('admin/logout');
    return res.data;
};