// here we are trying to create the controllers
module.exports.home=function(req,res){
    // return res.end('<h1>Express is up for the codeial</h1>');
    return res.render('home',{
        'title':"home"
        
    })
}
