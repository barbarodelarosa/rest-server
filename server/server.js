require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();



const bodyParser = require('body-parser');

// Parse los datos enviador por /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importa las rutas para usuario
app.use(require('./routes/route-usuario'));


mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {

    console.log(`Estamos por el puesto ${process.env.PORT}`);
});