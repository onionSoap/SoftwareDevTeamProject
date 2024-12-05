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
const axios = require('axios');

// -------------------------------------  APP CONFIG   ----------------------------------------------

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: [
    __dirname + '/views/partials',
    __dirname + '/views/partials/svg_components'
  ],
  helpers: {
    eq: function (a, b) {
      return a === b;
    }
  }
});
// -------------------------------------  DB CONFIG AND CONNECT   ---------------------------------------
//TODO: Use this later for setting up db!
//accessed by either: hosted by another entity (need to have the url to access that)
                    //hosted outself, create two docker containers that runs the application and the other the database
const dbConfig = {
  host: process.env.POSTGRES_HOST,
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
    resave: false
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


app.get('/', (req, res) => {
  res.redirect('/login'); //this will call the /anotherRoute route in the API
});
  
app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlUsername = "SELECT * FROM users WHERE username = $1;";

  try {
    const user = await db.oneOrNone(sqlUsername, [username]);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        delete user.password;
        req.session.user = user;
        req.session.save();
        res.status(200).redirect('/page1');
      } else {
        res.render('pages/login', { message: "Incorrect username or password.", error: true });
      }
    } else {
      res.render('pages/login', { message: "Incorrect username or password.", error: true });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).render('pages/login', { message: "An error occurred during login.", error: true });
  }
});

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
  // console.log(username, password, hash);
  //the rest of the information in the users table is auto generated
  const sqlRegister = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;" ;
  const sqlUsersPuzzles = "INSERT INTO users_puzzles (user_id, puzzle_id) VALUES ($1, 1), ($1, 2), ($1, 3) RETURNING *;";
  const sqlUsersItems = "INSERT INTO users_items (user_id, item_id) VALUES ($1, 1),($1, 2),($1, 3),($1, 4),($1, 5),($1, 6),($1, 7),($1, 8),($1, 9),($1,10),($1, 11),($1, 12),($1, 13) RETURNING *";
  const sqlSceneState = "INSERT INTO scene_state (user_id,scene_number, object, visible_state) VALUES ($1,'1','antlers','visible'),($1,'1','complete_carrot_nose', 'hidden'),($1,'1','complete_christmas_lights', 'hidden'),($1,'1','complete_wreath', 'hidden'),($1,'1','key','hidden'),($1,'1','flour','visible'),($1,'1','christmas_lights','visible'),($1,'2', 'dough_in_bowl', 'hidden'),($1,'2', 'carrot', 'visible'),($1,'2', 'butter', 'visible'),($1,'2', 'sugar', 'visible'),($1,'3','lock_open','hidden'),($1,'3','lock_closed','visible'),($1,'3','cookie_cutter','hidden'),($1,'3','mistletoe','hidden'),($1,'4','small_tree','visible'),($1,'4','lucky_star','visible'),($1,'4','complete_christmas_tree','hidden'),($1,'4','wreath','visible'),($1,'3b','scene3_b','hidden'),($1,'3b','potion_steam','hidden'),($1,'3b','potion','hidden'),($1,'3b','cookie_cutter','visible'),($1,'3b','mistletoe','visible'),($1,'2b','scene2_b','hidden'),($1,'2b','cookies','hidden'),($1,'2b','cookie_cutouts','hidden'),($1,'2b','pan','hidden'),($1,'2b','oven_door','visible'), ($1, '2', 'dough_counter0', 'visible'),($1, '2', 'dough_counter1', 'hidden'),($1, '2', 'dough_counter2', 'hidden'),($1, '3b', 'potion_counter0', 'visible'),($1, '3b', 'potion_counter1', 'hidden'),($1, '3b', 'potion_counter2', 'hidden'),($1, '3b', 'potion_counter3', 'hidden'),($1, '3b', 'potion_counter4', 'hidden') RETURNING *;";
  try{
    // console.log("In try")
    // const temp_<w/e> NOT NECESSARY BUT GOOD TO T/S 
    const temp_user = await db.one(sqlRegister, [username, hash]); //changed to one to get the temp_user variable data
    // console.log("Users: ", temp_user)
    //console.log("temp_user.user_id: ",temp_user.user_id)
    const temp_up = await db.any(sqlUsersPuzzles, [temp_user.user_id]); //changed to any instead of one since there are three insertions
    // console.log("Users_Puzzles: ", temp_up)
    const temp_ui = await db.any(sqlUsersItems, [temp_user.user_id]);
    // console.log("Users_Items: ", temp_ui);
    const temp_ss = await db.any(sqlSceneState, [temp_user.user_id]);
    //console.log("Scene_state for new user: ", temp_ss);
    res.status(200).render('pages/register', {message: "Registration Successful!"});
  }
  catch(error) {
    // console.log("in catch")
    res.status(400).render('pages/register', {message: "Registration Error!", error: true});
    // res.redirect('/register', {message:"Registration Error!", error: true});
  }
});

// Authentication Middleware.
const auth = (req, res, next) => {
  console.log(req.session)
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  } else if ((req.url == '/page1' || req.url == '/page2' || req.url == '/page3' || req.url == '/page4') && req.session.user.progress == 13) {
    return res.redirect('/game_complete');
  }
  next();
};

// Authentication Required
app.use(auth);

app.get('/game_complete', (req, res) => {
  res.render('pages/game_complete', {user: req.session.user}); 
});

app.use(bodyParser.json());

app.post('/save_timer', (req, res) => {
  const user_id = req.session.user.user_id;
  const timer = req.body.timer;

  // updating user timer in DB
  const sqlUpdateTimer = 'UPDATE users SET timer = $1 WHERE user_id = $2;';
  db.none(sqlUpdateTimer, [timer, user_id])
    .then(() => {
      req.session.user.timer = timer;
      res.status(200).send({ message: 'Timer saved successfully' });
    })
    .catch(error => {
      console.error('Error saving timer:', error);
      res.status(500).send({ error: 'Error saving timer' });
    });
});

app.get('/page1', (req, res) => {
  const user_id = req.session.user.user_id;

  const sqlPage1 = `
    SELECT * FROM scene_state 
    WHERE scene_number = '1' AND user_id = $1;
  `;

  const sqlItems = `
    SELECT items.name, users_items.status 
    FROM items 
    JOIN users_items ON items.item_id = users_items.item_id 
    WHERE users_items.user_id = $1
    ORDER BY items.item_id;
  `;

  const userProgress = `SELECT progress FROM users WHERE user = ${req.session.user};`
  db.any(sqlPage1, [user_id])
    .then(sceneData => {
      db.any(sqlItems, [user_id])
        .then(itemData => {
          res.render('pages/page1', {
            user: req.session.user,
            scene_1_visible_items: JSON.stringify(sceneData),
            items: itemData
          });
        })
        .catch(err => {
          console.error('Error fetching items:', err);
          res.status(500).send('Error fetching items');
        });
    })
    .catch(err => {
      console.error('Error fetching scene data:', err);
      res.status(500).send('Error fetching scene data');
    });
});


app.get('/page2', (req, res) => {
  const user_id = req.session.user.user_id;

  // Query to get scene data
  const sqlPage2 = `
    SELECT * FROM scene_state 
    WHERE (scene_number = '2' OR scene_number = '2b') AND user_id = $1;
  `;

  // Query to get user's items and statuses
  const sqlItems = `
    SELECT items.name, users_items.status 
    FROM items 
    JOIN users_items ON items.item_id = users_items.item_id 
    WHERE users_items.user_id = $1
    ORDER BY items.item_id;
  `;

  db.any(sqlPage2, [user_id])
    .then(sceneData => {
      db.any(sqlItems, [user_id])
        .then(itemData => {
          // Pass the items data to the template
          res.render('pages/page2', {
            user: req.session.user,
            scene_2_visible_items: JSON.stringify(sceneData),
            items: itemData
          });
        })
        .catch(err => {
          console.error('Error fetching items:', err);
          res.status(500).send('Error fetching items');
        });
    })
    .catch(err => {
      console.error('Error fetching scene data:', err);
      res.status(500).send('Error fetching scene data');
    });
});


app.get('/page3', (req, res) => {
  const user_id = req.session.user.user_id;

  const sqlPage3 = `
    SELECT * FROM scene_state 
    WHERE (scene_number = '3' OR scene_number = '3b') AND user_id = $1;
  `;

  const sqlItems = `
    SELECT items.name, users_items.status 
    FROM items 
    JOIN users_items ON items.item_id = users_items.item_id 
    WHERE users_items.user_id = $1
    ORDER BY items.item_id;
  `;

  db.any(sqlPage3, [user_id])
    .then(sceneData => {
      db.any(sqlItems, [user_id])
        .then(itemData => {
          res.render('pages/page3', {
            user: req.session.user,
            scene_3_visible_items: JSON.stringify(sceneData),
            items: itemData
          });
        })
        .catch(err => {
          console.error('Error fetching items:', err);
          res.status(500).send('Error fetching items');
        });
    })
    .catch(err => {
      console.error('Error fetching scene data:', err);
      res.status(500).send('Error fetching scene data');
    });
});


app.get('/page4', (req, res) => {
  const user_id = req.session.user.user_id;

  const sqlPage4 = `
    SELECT * FROM scene_state 
    WHERE scene_number = '4' AND user_id = $1;
  `;

  const sqlItems = `
    SELECT items.name, users_items.status 
    FROM items 
    JOIN users_items ON items.item_id = users_items.item_id 
    WHERE users_items.user_id = $1
    ORDER BY items.item_id;
  `;

  db.any(sqlPage4, [user_id])
    .then(sceneData => {
      db.any(sqlItems, [user_id])
        .then(itemData => {
          res.render('pages/page4', {
            user: req.session.user,
            scene_4_visible_items: JSON.stringify(sceneData),
            items: itemData
          });
        })
        .catch(err => {
          console.error('Error fetching items:', err);
          res.status(500).send('Error fetching items');
        });
    })
    .catch(err => {
      console.error('Error fetching scene data:', err);
      res.status(500).send('Error fetching scene data');
    });
});



app.get('/scoreboard', (req, res) => {
  const sqlForTimer = 'SELECT * FROM users ORDER BY timer ASC;';
  db.any(sqlForTimer)
  .then(data => {
    //console.log(data);
    res.render('pages/scoreboard', {scoreboard_data: data, user: req.session.user});
  })
  .catch(function (err){
    res.status(400).send({message:"Failed to load scoreboard."});
  });
});
//These moved below middleware bc only logged-in users should be able to do these actions. For testing purposes, move ABOVE middleware!

//READ UPPERCASE COMMENTS CLOSELY 
//update this to PATCH not POST
app.patch('/update_item_status', (req, res) => {
  // const {user_id, item_id, new_status} = req.body;
  // FOR TESTING PURPOSES, vTHISv IS COMMENTED OUT. ONCE TESTING IS CONCLUDED (aka, docker-compose.yaml set to npm start vs npm run tests) 
  // UNCOMMENT AND REMOVE user_id FROM ABOVE LINE.
  const {item_name, new_status} = req.body;
  const user_id = req.session.user.user_id;
  const valid_status = ['unknown','found','active','disabled'];
  if(!valid_status.includes(new_status)){
    res.status(400).send({error: 'Item Status Update Error!'});
    return;
  }

  //Find item id:
  const sql_get_puzzle_id =`SELECT item_id FROM items WHERE name = '${item_name}';`;
  db.many(sql_get_puzzle_id).then(async function(data){
    const item_id = data[0].item_id;
    //console.log(item_id);

    //Update item status:
    try{
      if(new_status == 'active'){
        const sqlFindActive = "SELECT * FROM users_items WHERE user_id = $1 AND status = 'active';";
        const current_active = await db.any(sqlFindActive, [user_id]);
        if(current_active.length > 0){ //aka, if the array is not empty (should only be 1 tho)
          const sqlChangeActive = "UPDATE users_items SET status = 'found' WHERE user_id = $1 AND item_id = $2;";
          await db.none(sqlChangeActive, [user_id, current_active[0].item_id]);
        }
      }
      const sql_item_update = "UPDATE users_items SET status = $1 WHERE user_id = $2 AND item_id = $3;";
      await db.none(sql_item_update, [new_status, user_id, item_id]);
      res.status(200).send({message:"Item status updated successfully!"}); 
      return;
    }
    //error if unable to
    catch (error){
      console.error('Error updating item status: ' + item_name + ' ' +  error);
      res.status(400).send({error: 'Item Status Update Error! '});
      return;
    }

  }).catch(error => {
    console.error('Item does not exist: ' + item_name + ' ' + error);
    res.status(400).send({error: 'Item with this name does not exist.'});
  });

  
});

app.post('/update_is_solved', async (req, res) => {
  const name = req.body.name;
  const user_id = req.session.user.user_id;

  //console.log(req.body);
  //Find the puzzle id:
  const sql_get_puzzle_id =`SELECT puzzle_id FROM puzzles WHERE name = '${name}';`;
  db.many(sql_get_puzzle_id).then(data => {
    //Update that the puzzle is solved for the user:
    const sql_update_is_solved = "UPDATE users_puzzles SET is_solved = TRUE WHERE user_id = $1 AND puzzle_id = $2;";
    db.none(sql_update_is_solved, [user_id, data[0].puzzle_id]).then(data2 => {

      //Update the user's progress:
      const sql_item_update = 'UPDATE users SET progress = $1 WHERE user_id = $2;'; 
      console.log("increment");
      req.session.user.progress += 1;
      var updated_progress = req.session.user.progress;

      db.none(sql_item_update, [updated_progress, user_id])
      .then(data2 => {
        res.status(200).send({message:"Puzzle was solved and progress updated successfully!"});
      })
      .catch(function (err) {
        res.status(400).send({message:"Progress failed to update"});
      });

    });
  }).catch(function (err) {
    res.status(400).send({message:"Puzzle is_solved failed to update (Incorrect puzzle name)."});
  });


});


//WIP
app.get('/all_current_item_status', async (req, res) => {
  //const {item_id} = req.body
  const user_id = req.session.user.user_id;
  const sqlGetStatus = "SELECT status FROM users_items WHERE user_id = $1"
  db.any(sqlGetStatus, [user_id])
  .then(data => {
    res.status(200).send({message:"Status was found and sent", item_status: data});
  })
  .catch(function (err) {
    res.status(400).send({message:"Failed to get status"});
  });
});

app.patch('/update_item_visibility', async (req, res) => {
  const {new_visibility_state, object_name} = req.body
  const user_id = req.session.user.user_id;
  const sqlUpdateVisibility = 'UPDATE scene_state SET visible_state = $1 WHERE user_id = $2 AND object = $3;'; 
  db.any(sqlUpdateVisibility, [new_visibility_state,user_id,object_name])
  .then(data => {
    //console.log("NVS: ",new_visibility_state,", ON: ", object_name, ", UI: ", user_id);
    res.status(200).send({message:"Visibility was updated in db", item_status: data});
  })
  .catch(function (err) {
    res.status(400).send({message:"Failed to update visibility in db"});
  });
});

//add gets for item status, and puzzle is_solved

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.status(200);
  res.render('pages/login', {message:"Logged out successfully!", error:false})
});

module.exports = app.listen(3000);
console.log('Server is listening on port 3000');


// [] [] [b] [y] [c] 