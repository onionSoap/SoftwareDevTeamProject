const express = require('express');
const app = express();
const PORT = 3000;
 
// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const message = 'This is a default endpoint!';
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/pages/test.html');
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});