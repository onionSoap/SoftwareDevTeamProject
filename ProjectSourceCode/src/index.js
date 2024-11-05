// ----------------------------------   DEPENDENCIES  ----------------------------------------------
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');

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

// -------------------------------------  DB CONFIG AND CONNECT   ---------------------------------------
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
const db = pgp(dbConfig);


// //// db test
// db.connect()
//   .then(obj => {
//     // Can check the server version here (pg-promise v10.1.0+):
//     console.log('Database connection successful');
//     obj.done(); // success, release the connection;
//   })
//   .catch(error => {
//     console.log('ERROR', error.message || error);
//   });


app.get('/page1', (req, res) => {
  res.render('pages/page1'); //this will call the /anotherRoute route in the API
});

app.get('/page2', (req, res) => {
  res.render('pages/page2'); //this will call the /anotherRoute route in the API
});

app.get('/', (req, res) => {
  res.redirect('/login'); //this will call the /anotherRoute route in the API
});
  
app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.get('/scoreboard', async (req, res) => {
  const sqlTopPlayers = `
    SELECT username, score 
    FROM players 
    ORDER BY score DESC 
    LIMIT 10;
  `;

  try {
    const players = await db.any(sqlTopPlayers);
    res.render('pages/scoreboard', { players });
  } catch (error) {
    console.error('Error fetching scoreboard data:', error);
    res.status(500).send('Error loading scoreboard');
  }
});

app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const sqlUsername = "SELECT * FROM users WHERE username = $1;"
    
    try{
      //async + await make it so that I don't need to do .then(data etc..) which makes the code cleaner and work more efficiently. 
      const user = await db.one(sqlUsername, [username])
      const match = await bcrypt.compare(password, user.password)
  
  
      // console.log("User is:", user);
      // console.log("Matched as:", match);
      // rest is mine from earlier
      if(match){
        // console.log("if statement")
        req.session.user = user;
        req.session.save();
        res.redirect('/discover')
      }
  
      else{
        // console.log("else statement")
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

app.listen(3000);
console.log('Server is listening on port 3000');
