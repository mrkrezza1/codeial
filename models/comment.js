const mongoose=require('mongoose');
// comment belongs to user
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:"true"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
});
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;