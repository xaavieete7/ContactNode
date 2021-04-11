const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const app = new express();

app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(4000, () => {
    console.log('Funciono sin problemas guapo')
});