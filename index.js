// first step is to make structural directory
// second step here for creating the directory we have given a command that is (mkdir views,models,controllers,routers,config)
// third step is to install express by givin command in the terminal that is npm install express
// fourth step is to set the npm start  through json file automatically for that you have to pass the command in the json file as like "start":"nodemon index.js"
// fifth step is to set the git repository by adding ( in these u got eligibility to ignore the loads of file just by writing some commands in that file )



const express = require('express')
const port = 8001;
const bodyParser = require('body-parser')// here we are going to addd the library of cookies which is used to store the data on the browser
const app = express();
const expressLayouts = require('express-ejs-layouts')//it is used to bring the common layouts
const db = require('./config/mongoose');//here we are importing the data from the server
// const sassMiddleware=require('')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const customMware = require('./config/middleware')

app.use(session({
    name: '__node_auth_login__',
    secret: "blah blah sommething",
    resave: false,
    saveUninitialized: false,          //set cookies if session gets created by passport
    cookie: { maxAge: 1000 * 60 * 40 }, //set expiration to 40 min
    store: new MongoStore({
        url: 'mongodb://127.0.0.1',
        // ttl: 14 * 24 * 60 * 60,      //either set cookies expiration or ttl here
        autoRemove: 'native'
    })
}))
app.use(express.urlencoded())//it is used to read the data
app.use(bodyParser.json())//now here express is going to use the cookie parser
app.use(expressLayouts)//here it used to use the common library


app.use(express.static('./assets'))//it is use to acces the static files
// extract the styles and scripts from subpages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');//here we are setting up the which engine we are using that is ejs
app.set('views', ('./views'))//which folder ejs has to show through its engine

// mongo store is used to keep cookie in the db


const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')

app.use(passport.initialize());

app.use(passport.session())
app.use(function(req,res,next){

    next();
})
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMware.setFlash);

// setup the express router
app.use('/', require('./routes'))//it is denoting that which folder has to access first

app.listen(port, function (err) {
    if (err) {
        console.log(`the server has given the error:${err}`)
    }
    console.log(`the server is running on the port: ${port}`)
}
)