const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author : {
        type : Schema.Types.objectId,
        ref : "User"
    },
    responseToUser : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    postId : {
        type : String,
    },
    content : {
        type : String,
    },
}, {timestamps : true}
)

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
    Comment
}
