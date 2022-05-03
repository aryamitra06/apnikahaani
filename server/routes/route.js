import express from 'express';
import Post from '../model/Post.js';
import Comment from '../model/Comment.js';
import upload from '../middleware/upload.js'
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

//google auth utils
const CLIENT_ID = '903948333203-5hlqr2q43lst7986r8oqq6c9cvqv821h.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const router = express.Router();

//middleware for checking authentication
function checkAuthenticated(req, res, next) {
    let token = req.cookies['session-token'];
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.status(401).send({ error: "Invalid token" });
        })
}

//google authentication
router.post('/auth', (req, res) => {
    let token = req.body.token;
    res.cookie('session-token', token);
    res.send('Success');
})


//<------route to fetch all the posts-------->
router.get('/', async (req, res) => {
    let posts;
    let email = req.query.email;
    let category = req.query.category;
    try {
        // handles ?username = ...
        if (email) {
            posts = await Post.find({ email: email })
        }
        else if (category) {
            posts = await Post.find({ category: category })
        }
        else {
            posts = await Post.find();
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})

//route to add a post
router.post('/add', checkAuthenticated, async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();
        res.status(200).json({"msg": "Success"});
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
router.put('/edit/:id', checkAuthenticated, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.email === req.user.email) {
            const editPost = new Post(req.body);
            await Post.updateOne({ _id: req.params.id }, editPost);
            res.json(post);
        }
        else {
            res.status(401).send("Not allowed");
        }
    } catch (error) {
        res.status(401).send("Not allowed");
    }
})

//deleting the post
router.delete('/delete/:id', checkAuthenticated, async (req, res) => {
    let post = await Post.findById(req.params.id);
    if (post.email === req.user.email) {
        await Post.deleteOne({ _id: req.params.id });
        let posts = await Post.find();
        res.json(posts);
    }
    else {
        res.status(401).send("Not allowed");
    }

})

//router to handle upload image
const url = 'http://localhost:8000';
router.post('/file/upload', upload.single('file'), async (req, res) => {
    if (!req.file)
        return res.status(404).json("File not found");
    const imageUrl = `${url}/file/${req.file.filename}`;
    res.status(200).json(imageUrl);
})

//fetching image from chunk
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});
router.get('/file/:filename', async (req, res) => {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
})

//posting a comment
router.post('/comment/new', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        comment.save();

        res.json(comment);
    } catch (error) {
        console.log(error);
    }
})

//fetching all comments
router.get('/comments/:id', async (req, res) => {
    try {
        let comments = await Comment.find({ postId: req.params.id })
        res.json(comments);
    } catch (error) {
        console.log(error);
    }
})

//deleteing a comment
router.delete('/comment/delete/:id', checkAuthenticated, async (req, res) => {
    let comment = await Comment.findById(req.params.id);
    if (comment.email === req.user.email) {
        await comment.deleteOne();
        res.json("deleted successfully");
    }
    else {
        res.status(401).send("Not allowed");
    }
})
export default router;