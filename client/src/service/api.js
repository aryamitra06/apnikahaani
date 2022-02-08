import axios from 'axios';

const url= 'http://localhost:8000';

// creating a post
export const createPost = async (post) => {
    return await axios.post(`${url}/add`, post);
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
    return await axios.put(`${url}/edit/${id}`, post)
}

// deleting the post
export const deletePost = async(id) =>{
    await axios.delete(`${url}/delete/${id}`)
}