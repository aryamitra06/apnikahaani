import express from 'express';
import Post from '../model/Post.js';

const router = express.Router();

//route to fetch all the posts
router.get('/', async (req, res) => {
    let posts;
    let username = req.query.username;
    let category = req.query.category;
    try {
        // handles ?username = ...
        if(username){
            posts = await Post.find({ username: username })
        }
        else if(category){
            posts = await Post.find({ category: category })
        }
        else{
            posts = await Post.find();
        }   
        res.json(posts);  
        console.log(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})

//route to add a post
router.post('/add', async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

//viewing the post
router.get('/view/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

//updating the post
router.put('/edit/:id', async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        post = req.body;
        const editPost = new Post(post);
        await Post.updateOne({_id: req.params.id}, editPost);
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

//deleting the post
router.delete('/delete/:id', async(req, res) => {
    await Post.deleteOne({_id: req.params.id});
    let posts = await Post.find();
    res.json(posts);
})


export default router;