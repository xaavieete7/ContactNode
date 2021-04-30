const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const userCtrl = require("./controllers/main");
const { config, engine } = require('express-edge');
const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/GrauPass', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(express.static(__dirname + '/public'));

app.get('/', userCtrl.homepage);

app.get('/passwords', userCtrl.password);
app.post('/addpassword', userCtrl.addpassword);
app.post('/deletepassword', userCtrl.dellpassword);
app.post('/editpassword', userCtrl.editpassword);

app.get('/create-account', userCtrl.createAccount);
app.post('/create-account', userCtrl.createAccountBack);

app.get('/login', userCtrl.login);
app.post('/login', userCtrl.loginBack);

app.get('/logout', userCtrl.logout);

app.listen(4000, () => {
    console.log('Funciono sin problemas guapo')
});