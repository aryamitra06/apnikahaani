import axios from 'axios';

const url= 'http://localhost:8000';

// creating a post
export const createPost = async (post) => {
    return await axios.post(`${url}/add`, post, {withCredentials: true, credentials: 'include'});
}

// getting all the posts (adding param so that it can handle query after that)
export const getAllPosts = async (param) => {
    const res = await axios.get(`${url}/${param}`);
    return res.data;
}

// viewing post
export const getPost = async (id) => {
    const res = await axios.get(`${url}/view/${id}`)
    return res.data;
}

// editing the post
export const editPost = async (id, post) => {
    return await axios.put(`${url}/edit/${id}`, post, {withCredentials: true, credentials: 'include'})
}

// deleting the post
export const deletePost = async(id) =>{
    await axios.delete(`${url}/delete/${id}`, {withCredentials: true, credentials: 'include'})
}

//upload file handler
export const uploadFile = async(data) =>{
    return await axios.post(`${url}/file/upload`, data)
}

//google auth
export const googleAuth = async(data) =>{
    return await axios.post(`${url}/auth`, data, {withCredentials: true, credentials: 'include'});
}

//adding a new comment
export const newComment = async(data) =>{
    return await axios.post(`${url}/comment/new`, data);
}