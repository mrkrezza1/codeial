// first step is to make structural directory
// second step here for creating the directory we have given a command that is (mkdir views,models,controllers,routers,config)
// third step is to install express by givin command in the terminal that is npm install express
// fourth step is to set the npm start  through json file automatically for that you have to pass the command in the json file as like "start":"nodemon index.js"
// fifth step is to set the git repository by adding ( in these u got eligibility to ignore the loads of file just by writing some commands in that file )
// const express=require('express');
// const app=express();
// const port=8000;


// use express router
// app.use('/',require('./routes'))

// set up view engine
// app.set('view engine','ejs');
// app.set('views','./views');

// use express controller 
// app.listen(port,function(err){
//     if(err){
//         console.log(`server is giving an error:${err}`)
//     }
//     console.log(`server is running on port : ${ port}`)
// })


const express=require('express')
const port=7000;
const app=express();
const expressLayouts=require('express-ejs-layouts')//it is used to bring the common layouts
const db=require('./config/mongoose');//here we are importing the data from the server
app.use(express.static('./assets'))//it is use to acces the static files
app.use(expressLayouts)//here it used to use the common library
app.use('/',require('./routes'))//it is denoting that which folder has to access first
// extract the styles and scripts from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.set('view engine','ejs');//here we are setting up the which engine we are using that is ejs
app.set('views',('./views'))//which folder ejs has to show through its engine
app.listen(port,function(err){
    if(err){
        console.log(`the server has given the error:${err}`)
    }
    console.log(`the server is running on the port: ${port}`)
}
)