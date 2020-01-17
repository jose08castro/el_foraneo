let connection =  require('./index');

const SELECTUSERS = 'SELECT usuario, nombre, apellidos from usuarios';

const all = async () =>{ //Returns all usernames
    return new Promise((resolve,reject)=>{

        connection.connection.query(SELECTUSERS, (err, results) =>{
            return (err) ?  reject(err) : resolve({usuarios: results});
        });

    });
}

const login = async (usuario,password) =>{
    return new Promise((resolve,reject) =>{
        let sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?"
        let params = [usuario,password];
        connection.connection.query(sql,params, (err, results) =>{
            return (err || results.length === 0)  ?  reject(err) : resolve({id: results[0].id}); //Si hay error o la contraseña es invalida, retornamos error, si no, el id.
        });
    });
}

const register = async (nombre, apellidos, correo, usuario, password) =>{
    return new Promise((resolve,reject) =>{
        //Verificamos si podemos registrar el usuario:
        let existsQuery = "SELECT usuario FROM usuarios WHERE usuario = ?";
        let params = [usuario];
        let exists = false;
        connection.connection.query(existsQuery, params,function (err, data) {
                if (!err) 
                    exists = data.length > 0;
        });
        if(!exists){
            let sql = "INSERT INTO usuarios(nombre,apellidos,correo,usuario,password) VALUES (?,?,?,?,?)"
            params = [nombre, apellidos, correo, usuario, password];
            connection.connection.query(sql,params, (err, results) =>{
                return (err) ?  reject(err) : resolve({result: true});
            });
        }
        else
            return reject("Error: el usuario ya existe");   
    });
}


// const seguir_usario = async (usuario,usuario_a_seguir) =>{
//     return new Promise((resolve,reject) =>{
//         let sql = "INSERT INTO seguidores (id_seguidor,id_seguido) VALUES (?,?)"
//         let params = [usuario,usuario_a_seguir];

//         connection.connection.query(sql,params, (err, results) =>{
//             return (err) ?  reject(err) : resolve({result: results.length});
//         });
//     });
// }


module.exports.all = all;
module.exports.login = login;
module.exports.register = register;

module.exports.default = {
    all,
    login,
    register
}