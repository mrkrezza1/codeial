const Post=require('../../../models/post')
const Comment=require('../../../models/comment')
module.exports.index=async function(req,res){
    try {
        let post=await Post.find({})
        .sort('-createdAt')
        .populate('user',{password:0})
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        return res.json(200,{
            message:"object list of the list in v2",
            posts:posts
        })
        
    } catch (error) {
        return res.json(500,{
            message:"error in the internal server"
        })
    }
}
module.exports.destroy=async  function(req,res){
    try {
        let post=await User.findById(req.params.id)
        post.remove();
        if(post.user == req.user.id){
            post.remove()
            await Comment.deleteMany({post:req.params.id})
            return res.json(200,{
                meassage:"post and its associated comment has been deleted successfully"
            })
        }else{
            return res.json(401,{
                message:"you cannot delete these post "
            })
        }
        
    }catch(err){
        return res.json(500,{
            message :"error in internal server"
        })
    }
    }