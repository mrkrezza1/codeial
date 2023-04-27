module.exports.family=function(req,res){
    // res.end("<h1>the family is here because i have made it</h1>")
    return res.render('family',{
        title:'fmaily'
    })
}