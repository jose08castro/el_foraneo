const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
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

router.get('/favoritas/:id_usuario', async (req, res) => {
    try{
        let recetas = {}
        if(req.params.id_usuario){
            console.log(req.params.id_usuario);
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

router.get('/categorias', async (req, res) =>{
    try{
        let categorias = await DB.default.recetas.categorias(); //Categorias
        console.log(categorias);
        res.json(categorias);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/notificaciones/:id',async (req, res) => {
    try{
        let dbResult = await DB.default.notificaciones.all(req.params.id);
        res.send(dbResult);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});


// router.get('/api/recetas/crear',async (req,res)=>{
//     try{
//         let dbResult = await DB.default.recetas.insertar(req.body.nombre);
//         res.send(dbResult);
//     }
//     catch(e){
//         console.log(e);
//         res.sendStatus(500);
//     }
// });



// router.get('*', (req, res) => {                       
//     res.sendFile(path.resolve('./scr/App.js'));                               
//   });
    router.post('/notificaciones', urlencodedParser, async (req , res)=> {
        try{
            if(req.body.read){
                //Read notifications if body includes it
                try{
                    let dbResult = await DB.default.notificaciones.all(req.body.id_usuario);
                    res.send(dbResult);
                }
                catch(e){
                    console.log(e);
                    res.sendStatus(500);
                }
            }
            let dbResult = await DB.default.notificaciones.insert(req.body.id_usuario, req.body.mensaje);
            res.send(req.body.usuario);
        }
        catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    });


module.exports = router;