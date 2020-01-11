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

module.exports = router;