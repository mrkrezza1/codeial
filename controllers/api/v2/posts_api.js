module.exports.index=function(req,res){
    return res.json(200,{
        message:"object list of the list in v2",
        posts:[]
    })
}