import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    created: {
        type: Date
    }
});

const post = mongoose.model('post', PostSchema)
export default post;