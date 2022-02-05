import express from 'express';
import Post from '../model/Post.js';

const router = express.Router();

//route to add a post
router.post('/add', async (req, res) => {
        try {
                const post = await new Post(req.body);
                post.save();
                res.status(200).json('Post saved successfully');
            } catch (error) {
                res.status(500).json(error);
            }
})


export default router;