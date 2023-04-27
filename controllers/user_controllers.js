module.exports.profile=function(req,res){
    // return res.end("<h1>hello this is profile</h1>")
    return res.render('users',{
        title:"user"
    })
}