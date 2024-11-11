// ----------------------------------   DEPENDENCIES  ----------------------------------------------
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const pgp = require('pg-promise')(); //library that gives me access to make any database that i have access to normally
const bcrypt = require('bcryptjs'); //  To hash passwords
const bodyParser = require('body-parser');
const session = require('express-session');
const { getBuiltinModule } = require('process');

// -------------------------------------  APP CONFIG   ----------------------------------------------

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir:[
    __dirname + '/views/partials',
    __dirname + '/views/partials/svg_components'
  ]
});
// -------------------------------------  DB CONFIG AND CONNECT   ---------------------------------------
//TODO: Use this later for setting up db!
//accessed by either: hosted by another entity (need to have the url to access that)
                    //hosted outself, create two docker containers that runs the application and the other the database
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
const db = pgp(dbConfig);


//// db test
db.connect()
  .then(obj => {
    // Can check the server version here (pg-promise v10.1.0+):
    console.log('Database connection successful');
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR', error.message || error);
  });

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
// OHs this should fix my style.css inaccessibility issue
app.use('/resources', express.static(path.join(__dirname, 'resources')));
// set Session
app.use(
  session({
    secret: "super duper secret!", //TODO: they might want us to put this in an env file, like: process.env.SESSION_SECRET
    saveUninitialized: true,
    resave: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});


app.get('/page1', (req, res) => {
  res.render('pages/page1'); //this will call the /anotherRoute route in the API
});

app.get('/page2', (req, res) => {
  res.render('pages/page2'); //this will call the /anotherRoute route in the API
});

app.post('/update_item_status', async (req, res) => {
  const {item_id, new_status} = req.body;
  //try to update the item status 
  try{
    const sql_item_update = 'UPDATE items SET status = $1 WHERE item_id = $2 RETURNING *';
    //call update with db.one and the new_status and item_id that we want to update
    db.one(sql_item_update, [new_status, item_id])
    //do we need the data? just put it because I always do.
    //also, don't reload the page bc tehre's no need (I think? We dont' want to have to refresh the page everytime we click an item)
    .then(data => {
      res.status(200).send('Item status updated successfully!');
      console.log('Item_id: ', item_id, " and new_status: ", new_status);
    })
    //reload the page with the error message pop-up
    .catch(function (err) {
      res.status(400);
      res.redirect('/page2', {message:"Item Status Update Error!"});
    });
  }
  //error if unable to
  catch (error){
    console.error('Error updating item status: ', error);
    res.status(400).send({error: 'Failed to update item status.'});
  }
})


app.get('/page3', (req, res) => {
  res.render('pages/page3'); //this will call the /anotherRoute route in the API
});

app.get('/', (req, res) => {
  res.redirect('/login'); //this will call the /anotherRoute route in the API
});
  
app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.post('/login', async (req, res) => {
    console.log('login post accessed')
    const username = req.body.username
    const password = req.body.password
    const hash = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hash)
    const sqlUsername = "SELECT * FROM users WHERE username = $1;"
    
    try{
      //async + await make it so that I don't need to do .then(data etc..) which makes the code cleaner and work more efficiently. 
      const user = await db.one(sqlUsername, [username])
      const match = await bcrypt.compare(password, user.password)
  
      //looks like there's a space for some reason? Why tho...?
      console.log("Username is:", username, ", Other username is:", user.username);
      console.log("Password is: ", password, ", Other password is: ", user.password)
      console.log("Matched as:", match);
      // rest is mine from earlier
      if(match){
        // if (user.password == password && user.username == username){
        console.log("if statement")
        req.session.user = user;
        req.session.save();
        res.redirect('/page1')
      }
  
      else{
        console.log("else statement")
        // If the password is incorrect, render the login page and send a message to the user stating "Incorrect username or password."
        res.render('pages/login', {message:"Incorrect username or password.", error:true})
        // res.render('/login')
      }
    }
    catch{
      console.log("User doesn't exist! Try registering")
      res.redirect('/register')
    }
  })

//register
app.get('/register', (req, res) => {
  res.render('pages/register');
});

//from lab 8
app.post('/register', async (req, res) => {
  //hash the password using bcrypt library
  const hash = await bcrypt.hash(req.body.password, 10);

  // DONE: Insert username and hashed password into the 'users' table
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password, hash);
  //the rest of the information in the users table is auto generated
  const sqlRegister = "INSERT INTO users (username, password) VALUES ($1, $2);" ;//removed returning *
  
  db.none(sqlRegister, [username, hash]) //changed any to none
  /*
    Redirect to GET /login route page after data has been inserted successfully.
    If the insert fails, redirect to GET /register route.
  */
  .then(data => {
    // console.log("Registered user with: ", data)
    //res.redirect('/login', {message:"Error discovering data.", error:true})
    res.status(200).render('pages/login', {message: "Registration Successful!"});
    // res.redirect('/login', {message:"Registration Successful!"});
    // res.redirect('/login');
  })
  .catch(function (err) {
    res.status(400).render('page/register', {message: "Registration Error!", error: true});
    // res.redirect('/register', {message:"Registration Error!", error: true});
  });
});

// Authentication Middleware.
const auth = (req, res, next) => {
  // console.log(req.session)
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  }
  next();
};

// Authentication Required
app.use(auth);

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.render('pages/login', {message:"Logged out successfully!", error:false})
});

module.exports = app.listen(3000);
console.log('Server is listening on port 3000');
