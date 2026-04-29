import api from './api';

// PUBLIC ALL POSTS
export const getPublicPosts = async () => {
    const res = await api.get('blog/posts');
    return res.data;
};

// PUBLIC SINGLE POST
export const getPublicPost = async (slug) => {
    const res = await api.get(`blog/posts/${slug}`);
    return res.data;
};

// ADMIN ALL POSTS
export const getPosts = async () => {
    const res = await api.get('admin/blog/posts');
    return res.data;
};

// ADMIN SINGLE POST
export const getPost = async (id) => {
    const res = await api.get(`admin/blog/posts/${id}`);
    return res.data;
};

// CREATE
export const createPost = async (data) => {
    const res = await api.post('admin/blog/posts', data);
    return res.data;
};

// UPDATE
export const updatePost = async (id, data) => {
    const res = await api.post(`admin/blog/posts/${id}`, data);
    return res.data;
};

// DELETE
export const deletePost = async (id) => {
    // Using POST with _method spoofing to bypass CORS restrictions on DELETE verb
    const res = await api.post(`admin/blog/posts/${id}`, { _method: 'DELETE' });
    return res.data;
};