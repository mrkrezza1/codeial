const User=require('../models/users')//here we are importing the data

// rendering the profile from the user
module.exports.profile =async function(req, res){
    try {
        let user=await User.findById(req.params.id)

        return res.render('users', {
            title: 'User Profile',
             profile_user:user
    })  
    } catch (error) {
      console.log("error in the profile",error)  
    }     
        
    
}
// updating the users email and name
module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
    try {
        let user=await User.findById(req.params.id,req.body)
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("multer error",err)
            }
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file){
                user.avatar=User.avatarPath+"/"+req.file.filename;
            }
            user.save();
            console.log(req.file)
            return res.redirect('back')
        })
    } catch (error) {
        req.flash("error",err)
        // console.log("error in updating")
        return res.redirect('back');
    }
        
    }else{
        req.flash("error",'unauthorized')
        return res.status(401).send("unauthorized")
    }
}

// rendering the sign up page
module.exports.signUp=async function(req,res){
    try {
        await res.render('user_sign_up',{
            title:"user | sign-up"
        });
        
    } catch (error) {
        console.log("error in sign up",error)
    }
}

// rendering the sign in page 
module.exports.signIn=async function(req,res){
try {
    await res.render('user_sign_in',{
        title:"user | sign-in"
    })
    
} catch (error) {
    console.log("error in sign in",error)
}
}

// get the sign up data
// first check password is not equal


module.exports.create =async function(req, res){
    if (req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
try{

    let user=await User.findOne({email: req.body.email})
    
    if (!user){
        console.log("user doesnt exist so we are creating the user")
        user=await User.create(req.body);
        if(!user){
            console.log("error in creating the user while we sign in")
            return res.redirect('/users/sign-in');
        }
    }
            
        return res.redirect('/');

}
catch(err){
    console.log(err)
}
}

// here we are loging in existing account
module.exports.createSession=function(req,res){
    req.flash('success',"loged in successfully")
    return res.redirect('/');
}

// creating for the logout router
module.exports.destroySession=function(req,res){
    req.logout(req.user,err=>{
        if(err){
            return;
        }
        req.flash('success',"loged out successfully")
        return res.redirect('/');
       });
}