const express = require('express');
const { urlencoded, json } = require('body-parser');
const { serverPort, maxFileSize } = require('./config');


const dogs = require('./dogs');
const birds = require('./birds');



const app = express();

//app.use(urlencoded({ limit: maxFileSize, extended: true }));
app.use(json({ limit: maxFileSize }));


//app.get('/', (req, res) => {
//	res.send('root');
//});

// app.get('/', function (req, res) {
//   res.send('tome')
// });

app.use('/birds', birds);
app.use('/dogs', dogs);



app.listen(serverPort);
console.log(`Listen on port ${serverPort}!`);
