require('./config/config')
const express = require('express');
const app = express();



const bodyParser = require('body-parser');

// Parse los datos enviador por /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
    res.json('Hola, vamos a hacer grandes cosass');
});


app.post('/usuario', (req, res) => {
    let body = req.body // captura todos lo datos que vienen por el formulario
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        });
    } else {
        res.json({ body });

    }
});
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id
    res.json({
        id,
        nombre: "Barbaro del ritmo"
    });
});
app.delete('/usuario', (req, res) => {
    res.json('Hola, vamos a hacer grandes cosass DELETE');
});

app.listen(process.env.PORT, () => {

    console.log(`Estamos por el puesto ${process.env.PORT}`);
});