const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const md5 = require('md5');

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

mongoose.connect('mongodb://localhost:27017/GrauPass', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const User = require('./models/user');
const Pass = require('./models/password');

app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    if (req.session.loggedin) {
        res.render('index', {session: req.session, username: req.session.username});
    } else {
        res.render('index');
    }

});

app.get('/passwords', (req, res) => {

    if (req.session.loggedin) {

        Pass.find({user: req.session.user_id}, (err, result) => {
            if (err) { res.send("Error interno"); console.log(err);}
            res.render('passwords', {session: req.session, username: req.session.username, passwords: result});
        });

    } else {
        res.redirect("/login");
    }
});

app.post('/addpassword', (req, res) => {

    const pass = new Pass ({
        user: req.session.user_id,
        url: req.body.url,
        username: req.body.username,
        password: req.body.password
    });

    pass.save((err) => {
        if (err) { res.send('Error al añadir la contraseña'); console.log(err); }
        res.send({success: 1});
    });

});

app.post('/deletepassword', (req, res) => {

    Pass.findOneAndRemove({url: req.body.url, username: req.body.username, password: req.body.password}, (err) => {
        if (err) { res.send('Error al eliminar la contraseña'); console.log(err); }
        res.send({success: 1});
    });

});

app.post('/editpassword', (req, res) => {

    Pass.updateOne({url: req.body.url, username: req.body.username, password: req.body.password},{url: req.body.url, username: req.body.username, password: req.body.password}, (err) => {
        if (err) { res.send('Error al editar la contraseña'); console.log(err); }
        res.send({success: 1});
    });

});

app.get('/create-account', (req, res) => {

    if (!req.session.loggedin) {
        res.render('create-account');
    } else {
        res.redirect("/");
    }

});

app.post('/create-account', (req, res) => {

    const user = new User ({
        user_id: md5(req.body.username),
        firstname: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    user.save((err) => {
        if (err) { res.send('Error al crear el usuario'); console.log(err); }
        res.redirect('/login?valid_user=true');
    });
});

app.get('/login', (req, res) => {

    if (!req.session.loggedin) {
        res.render('login');
    } else {
        res.redirect("/");
    }

});

app.get('/logout', (req, res) => {

    if (req.session.loggedin) {
        req.session.destroy();
        res.redirect("/");
    } else {
        res.redirect("/");
    }

});

app.post('/login', (req, res) => {

    User.findOne({ email: req.body.email, password: req.body.password }, function (err, User) {

        if (!err) {
            if (User) {
                req.session.loggedin = true;
                req.session.user_id = User.user_id;
                req.session.firstname = User.firstname;
                req.session.lastname = User.lastname;
                req.session.email = User.email;
                req.session.username = User.username;
                res.redirect("/");
            } else {
                res.send("Has introducido mal los datos melón");
            }

        } else {
            res.send("Ui ui problemillas");
        }

    });
});


app.listen(4000, () => {
    console.log('Funciono sin problemas guapo')
});