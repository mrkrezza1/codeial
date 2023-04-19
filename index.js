// first step is to make structural directory
// second step here for creating the directory we have given a command that is (mkdir views,models,controllers,routers,config)
// third step is to install express by givin command in the terminal that is npm install express
// fourth step is to set the npm start  through json file automatically for that you have to pass the command in the json file as like "start":"nodemon index.js"
// fifth step is to set the git repository by adding ( in these u got eligibility to ignore the loads of file just by writing some commands in that file )
const express=require('express');
const app=express();
const port=8000;

// use express router
app.use('/',require('./routes'))

// use express controller 
app.listen(port,function(err){
    if(err){
        console.log(`server is giving an error:${err}`)
    }
    console.log(`server is running on port : ${ port}`)
})