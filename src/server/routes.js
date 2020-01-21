const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended : false});

router.get('/usuarios', async (req , res)=> {
    try{
        let usuarios = await DB.default.usuarios.all();
        res.json(usuarios);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/login', urlencodedParser, async (req , res)=> {
    try{
        let dbResult = await DB.default.usuarios.login(req.body.usuario, req.body.password);
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

router.post('/user/register', urlencodedParser, async (req , res)=> {
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
router.get('/recetas', async (req , res)=> {
    try{
        let recetas = {}
        if(typeof req.query.id !== 'undefined' ){
            recetas = await DB.default.recetas.find(req.query.id); //Recetas favoritas
        }
        else if(typeof req.query.search !== 'undefined'){
            recetas = await DB.default.recetas.search(req.query.search); //Busqueda de recetas
        }
        else{
            recetas =  await DB.default.recetas.all();
        }
        res.json(recetas);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/todas/:id_usuario', async (req , res)=> {
    try{
        let recetas =  await DB.default.recetas.allUser(req.params.id_usuario);
        res.json(recetas);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/plan', async (req , res)=> {
    try{
        let min= req.query.min,max=req.query.max,id_categoria=req.query.id_categoria,cantidad=req.query.cantidad;
        let recetas =  await DB.default.recetas.plan(min,max,id_categoria,cantidad);
        if(recetas.recetas.length > 0){
            res.json({recetas:recetas, result:true});
        }
        else{
            res.json({result:false});
        }
    }
    catch(e){
        console.log(e);
        res.json({result:false});
    }
});

router.get('/favoritas/:id_usuario', async (req, res) => {
    try{
        let recetas = {}
        if(req.params.id_usuario){
            recetas = await DB.default.recetas.favoritas(req.params.id_usuario); //Recetas favoritas
            res.json(recetas);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/usuario/:id_usuario', async (req, res) => {
    try{
        let userInfo = {}
        if(req.params.id_usuario){
            userInfo = await DB.default.usuarios.find(req.params.id_usuario); //Recetas favoritas
            res.json(userInfo);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/categorias', async (req, res) =>{
    try{
        let categorias = await DB.default.recetas.categorias(); //Categorias
        res.json(categorias);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/like',async (req, res) => {
    try{
        let dbResult = await DB.default.recetas.like(req.query.id_receta,req.query.id_usuario);
        res.send(dbResult);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/share',async (req, res) => {
    try{
        let dbResult = await DB.default.recetas.share(req.query.id_receta,req.query.id_usuario);
        res.send(dbResult);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/rate',async (req, res) => {
    try{
        let dbResult = await DB.default.recetas.rate(req.query.id_receta,req.query.id_usuario, req.query.rating);
        res.send(dbResult);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/notificaciones', async (req , res)=> {
    try{
        let dbResult = await DB.default.notificaciones.all(req.query.id_usuario);
        res.json({notificaciones:dbResult, result:true});
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;