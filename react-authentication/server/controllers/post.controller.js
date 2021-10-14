const {User} = require("../models/user.model")
const{Post,Comment} = require("../models/post.model")

const PostDict ={
    create: function(req,res){
        const data = {
            title:req.body.title,
            content:req.body.content,
            creator:req.userData.id
        }
        Post.create(data)
            .then(post=>{
                res.status(200).json(post)
            })
            .catch(err=>res.status(400).json({message:err.message}))
    },
    getAll:function(req,res){
        Post.find({}).populate('comments').populate("creator").exec()
            .then(posts=>res.status(200).json(posts))
            .catch(err=>res.status(400).json({message:err.message}))

    },
    postComments:function(req,res){
        Comment.create(req.body)
            .then(comment=> {
                Post.findByIdAndUpdate(`${req.params.postId}`,{"$push":{
                        "comments":comment
                    }})
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err.message))
            })
            .catch(err=>console.log(err.message))


    }


}

module.exports = {PostDict}
