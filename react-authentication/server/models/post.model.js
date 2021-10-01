const mongoose = require("mongoose")
const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    }
})


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments:[{type:mongoose.Schema.ObjectId, ref:'Comment'}]
});

module.exports.Post = mongoose.model("Post",PostSchema)
module.exports.Comment = mongoose.model("Comment",CommentSchema)
module.exports.PostSchema = PostSchema;
