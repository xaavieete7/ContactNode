const mongoose = require('mongoose')
const User = require('../models/user')
const Pass = require('../models/password')
const md5 = require('md5');

function homepage(req, res) {

    if (req.session.loggedin) {
        res.render('index', {session: req.session, username: req.session.username});
    } else {
        res.render('index');
    }

}

function password (req, res) {

    if (req.session.loggedin) {

        Pass.find({user: req.session.user_id}, (err, result) => {
            if (err) { res.send("Error interno"); console.log(err);}
            res.render('passwords', {session: req.session, username: req.session.username, passwords: result});
        });

    } else {
        res.redirect("/login");
    }

}

function addpassword (req, res) {

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
}

function dellpassword (req, res) {

    Pass.findOneAndRemove({url: req.body.url, username: req.body.username, password: req.body.password}, (err) => {
        if (err) { res.send('Error al eliminar la contraseña'); console.log(err); }
        res.send({success: 1});
    });
}

function editpassword (req, res) {

    Pass.updateOne({url: req.body.url, username: req.body.username, password: req.body.password},{url: req.body.url, username: req.body.username, password: req.body.password}, (err) => {
        if (err) { res.send('Error al editar la contraseña'); console.log(err); }
        res.send({success: 1});
    });

}

function createAccount (req, res) {

    if (!req.session.loggedin) {
        res.render('create-account');
    } else {
        res.redirect("/");
    }
}

function createAccountBack (req, res) {

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

}

function login (req, res) {

    if (!req.session.loggedin) {
        res.render('login');
    } else {
        res.redirect("/");
    }
}

function loginBack (req, res) {

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
}

function logout (req, res) {

    if (req.session.loggedin) {
        req.session.destroy();
        res.redirect("/");
    } else {
        res.redirect("/");
    }

}

module.exports = {
    homepage,
    password,
    addpassword,
    dellpassword,
    editpassword,
    createAccount,
    createAccountBack,
    login,
    loginBack,
    logout
}