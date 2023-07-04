const Comment = require('../models/comment')
const Post = require('../models/post')
// module.exports.create=function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             },function(err,comment){
//                 post.comments.push(comment);

//                 post.save();
//                 res.redirect('/');
//             })
//         }
//     })
// }

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post)
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        content: req.body.content,
                        user: req.user.id
                    },
          
                    message: "comment has been created"
                })
            }
            req.flash('success', "comment has been created")
            post.comments.push(comment);
            post.save();
            res.redirect('/')
        }

    } catch (err) {
        console.log("error in creating the comments")
        return;
    }
}

// module.exports.destroy=function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user==req.user.id){
//             let postId=comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err){
//                 return res.redirect('back')
//             })
//         }else{
//             return res.redirect('back')
//         }
//     })
// }

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } })
            if(req.xhr){
                return res.status({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"the comment has been deleted"

                })
            }
            req.flash('error', "comment has been deleted")

            return res.redirect('back')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log("error in deleting the commemt", error)
        return;
    }
}