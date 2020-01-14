const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended : false});

router.get('/api/usuarios', async (req , res)=> {
    try{
        let usuarios = await DB.default.usuarios.all();
        res.json(usuarios);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/login', urlencodedParser, async (req , res)=> {
    try{
        let dbResult = await DB.default.usuarios.login(req.body.usuario, req.body.password);
        console.log(dbResult);
        if(dbResult.result > 0)
            res.send(req.body.usuario);
        else
            res.send("Invalid username or password")
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/crear_receta', urlencodedParser, async (req , res)=> {
    try{
        let dbResult = await DB.default.recetas.crear(req.body.nombre, req.body.password);
        console.log(dbResult);
        if(dbResult.result > 0)
            res.send(req.body.usuario);
        else
            res.send("Invalid username or password")
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/crear_receta', urlencodedParser, async (req , res)=> {
    try{
        let dbResult = await DB.default.recetas.crear(req.body.nombre, req.body.password);
        console.log(dbResult);
        if(dbResult.result > 0)
            res.send(req.body.usuario);
        else
            res.send("Invalid username or password")
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/notificaciones',async (req, res) => {
    try{
        let dbResult = await DB.default.notificaciones.all(req.query.id);
        res.send(dbResult);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/notificaciones', urlencodedParser, async (req , res)=> {
    try{
        let dbResult = await DB.default.notificaciones.insert(req.body.id_usuario, req.body.mensaje);
        console.log(dbResult);
        res.send(req.body.usuario);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/notificaciones/read',async (req, res) => {
    try{
        let dbResult = await DB.default.notificaciones.all(req.query.id);
        res.send(dbResult);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;