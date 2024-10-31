app.get('/', (req, res) => {
    res.redirect('/login'); //this will call the /anotherRoute route in the API
  });
  
app.get('/login', (req, res) => {
res.render('pages/login')
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