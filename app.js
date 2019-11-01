const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');


mongoose.connect(config.database);
let db = mongoose.connection;
//Check Connection
db.on('open', function(){
    console.log('Connected to DB');
});
//Check for DB errors
db.on('error', function(err){
    console.log(err);
});

//Init app
const app = express();
//Bring in Models
let Category = require('./models/category');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
app.use(bodyParser.json());
//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true   
}));

//Express Message Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg ,value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() +']' ;
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Passport Config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//defining global user variable
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next(); 
});

//Home Router
app.get('/', function(req, res){

    Category.find({}, function(err, categories){
        if(err){
            console.log(err);
        }
        else{
           
            res.render('index', {
                title:'Index page',
                categories: categories
            });

        }
    });
  
});

//Router file
let categories = require('./routes/category');
let products = require('./routes/product');
let charts = require('./routes/chart');
let users = require('./routes/user');

app.use('/category', categories);
app.use('/product', products);
app.use('/chart', charts);
app.use('/user', users);

//Start Server
app.listen(3000, function(){
    console.log('server started on port 3000');
});