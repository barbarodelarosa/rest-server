const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');


const bodyParser = require('body-parser');

// Parse los datos enviador por /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 10;
    desde = Number(desde);
    limite = Number(limite);
    let usuariosActivos = {
        estado: true
    }
    Usuario.find(usuariosActivos, 'nombre email rol estado google imagen')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count(usuariosActivos, (err, conteo) => {

                res.json({
                    ok: true,
                    conteo,
                    usuarios
                });
            });

        })
        // res.json('Hola, vamos a hacer grandes cosass');
});


app.post('/usuario', (req, res) => {
    let body = req.body // captura todos lo datos que vienen por el formulario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "No se pudo crear la Base de datos",
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // .pick devuelve un arreglo con todos los campos validos para utilizar
    let body = _.pick(req.body, ['nombre', 'email', 'image', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let cambiarEstado = {
            estado: false
        }
        // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        };


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    })


});

module.exports = app;