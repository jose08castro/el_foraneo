const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
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
        if(dbResult.id)
            res.send({result:true, id:dbResult.id});
        else
            res.send({result:false,message:"Invalid username or password"})
    }
    catch(e){
        console.log(e);
        res.send({result:false,message:"Invalid username or password"})
    }
});

router.post('/api/user/register', urlencodedParser, async (req , res)=> {
    try{
        let result = true;
        let dbResult = await DB.default.usuarios.register(req.body.nombre, req.body.apellidos, req.body.correo, req.body.usuarioR, req.body.passwordR);
        if(dbResult.errno)
            result = false;
        res.send({result:result});
    }
    catch(e){
        console.log(e);
        res.send({result:false, message:"Error al crear usuario, asegurese de que su usuario sea único."});
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

// router.get('*', (req, res) => {                       
//     res.sendFile(path.resolve('./scr/App.js'));                               
//   });

module.exports = router;