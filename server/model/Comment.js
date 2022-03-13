import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    profilephoto:{
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const comment = mongoose.model('comment', CommentSchema)
export default comment;