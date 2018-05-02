const express = require('express');
const { urlencoded, json } = require('body-parser');
const {serverPort,maxFileSize} = require('./config'); // destroctoring  

const app = express();


const api = express.Router();
api.use(urlencoded({limit: maxFileSize, extended: true}));
api.use(json({limit: maxFileSize}));

//app.set('view engine', 'pug')

app.use('/', api);

api.get('/:name',(req, res) =>{
	console.log(req.params.name);
	res.send('hello Alex titan caravaca');
});


api.post('/id',(req,res) =>{
	res.send(`<p> ${req.body.user.name} </p>`)
});

app.listen(serverPort);
console.log(`listening on port ${serverPort}`);