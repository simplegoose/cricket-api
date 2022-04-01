const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const {
    CONN_STRING,
    SESS_SECRET = 'FJDJALKJDALKDJ;A',
    IN_PROD = 'development'
} = process.env;

//Cors options to specify clients
const corsOptions = {
    origin: ['http://localhost:3000', 'https://cricket-frontend.vercel.app'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
}

mongoose
.connect(CONN_STRING + 'cricketapi')
.then( res => console.log('Connected to db'))
.catch( e => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enables sessions
app.use(session({
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: IN_PROD === 'production' ? 'none' : 'lax',
        secure: IN_PROD === 'production' ? true : false
    },
    store: MongoStore.create({
        mongoUrl: CONN_STRING + 'cricketapi',
        autoRemove: 'interval',
        autoRemoveInterval: 30
    }) 
}));

//Enable server to allow requests from specified clients
app.use(cors(corsOptions));

app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT);