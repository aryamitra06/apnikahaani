import axios from 'axios';

const url= 'http://localhost:8000';

// creating a post
export const createPost = async (post) => {
    return await axios.post(`${url}/add`, post);
}

// getting all the posts
export const getAllPosts = async () => {
    const res = await axios.get(`${url}`);
    return res.data;
}