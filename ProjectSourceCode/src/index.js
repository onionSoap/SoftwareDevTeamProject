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
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: [
    path.join(__dirname, 'views/partials'),
    path.join(__dirname, 'views/partials/svg_components')
  ],
  helpers: {
    range: function(start, end, options) {
      let result = '';
      for (let i = start; i < end; i++) {
        result += options.fn(i);
      }
      return result;
    }
  }
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static and session configuration
app.use(bodyParser.json());
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use(
  session({
    secret: "super duper secret!", // Consider moving this to .env as process.env.SESSION_SECRET
    saveUninitialized: true,
    resave: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// -------------------------------------  DB CONFIG AND CONNECT   ---------------------------------------
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
const db = pgp(dbConfig);

// Routes
app.get('/page1', (req, res) => {
  res.render('pages/page1');
});

app.get('/page2', (req, res) => {
  res.render('pages/page2');
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.get('/scoreboard', (req, res) => {
  res.render('pages/scoreboard');
});

app.get('/inventory', (req, res) => {
  res.render('pages/inventory');
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlUsername = "SELECT * FROM users WHERE username = $1;";
  
  try {
    const user = await db.one(sqlUsername, [username]);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user = user;
      req.session.save();
      res.redirect('/discover');
    } else {
      res.render('pages/login', {message: "Incorrect username or password.", error: true});
    }
  } catch {
    console.log("User doesn't exist! Try registering");
    res.redirect('/register');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
