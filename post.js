const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    content:{
        type : String,
        require:"true"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include the ids of array of all the comments in the schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
}
);
const Post=mongoose.model('Post',postSchema);
module.exports=Post;
