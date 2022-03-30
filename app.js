const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
require('dotenv').config();

const {
    CONN_STRING
} = process.env;

mongoose
.connect(CONN_STRING + 'cricketapi')
.then( res => console.log('Connected to db'))
.catch( e => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(8080)