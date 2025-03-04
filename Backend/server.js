// api conect to mongodb 
//import express from 'express';

const express = require('express');
const  app = express();
const port = 3000;

const users = []
app.post('/usuarios', (req, res) => {
    console.log(req);
    res.send('ok post');
});


app.get('/usuarios', (req, res) => {
    res.send('Hello World!');
}); 

app.listen(port, () => {       
    console.log(`Example app listening at http://localhost:${port}`);
});