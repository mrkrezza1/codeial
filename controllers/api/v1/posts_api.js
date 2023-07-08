const Post=require('../../../models/post')
const Comment=require('../../../models/comment')
// const { post } = require('../../../routes/api')
module.exports.index=async function(req,res){
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })

     return res.json(200,{
        message:"lists of posts",
        posts:posts
    })
}


    module.exports.destroy = async function (req, res) {
        try {
            let post = await Post.findById(req.params.id);
            post.remove();
            
            await Comment.deleteMany({ post: req.params.id })
    
            
            return res.json(200,{
                message:"post and its assosciated comment has been deleted successfully"
            })
        } catch (err) {
            return res.json(500,{
                message:"error in the internal server"
            });
        }
    }