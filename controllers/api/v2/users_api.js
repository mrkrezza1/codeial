const User = require('../../../models/users');
const jwt=require('jsonwebtoken')
module.exports.createSession=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email})
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"user is not authenticated"
            })

        }
        return res.json(200,{
            message:"now your taken has generated successfully plz keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:100000})
            }
        })
    } catch (error) {
        console.log("*****",error)
        return res.json(500,{
            message:"internal server error"
        })
    }
}

