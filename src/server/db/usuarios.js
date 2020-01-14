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
        console.log(usuario);
        console.log(password);
        connection.connection.query(sql,params, (err, results) =>{
            return (err) ?  reject(err) : resolve({result: results.length});
        });
    });
}

const register = async (nombre, apellidos, usuario, password) =>{
    return new Promise((resolve,reject) =>{
        //Verificamos si podemos registrar el usuario:
        let existsQuery = "SELECT usuario FROM usuarips WHERE usuario = ?";
        let params = [usuario];
        let exists = false;
        connection.connection.query(existsQuery, params,function (err, data) {
                if (err) {
                } else {
                    exists = data.length > 0;
                }
        });
        if(!exists){
            let sql = "INSERT INTO usuarios(nombre,apellidos,usuario,password) VALUES (?,?,?,?)"
            params = [nombre, apellidos,usuario,password];
            connection.connection.query(sql,params, (err, results) =>{
                return (err) ?  reject(err) : resolve({result: true});
            });
        }
        else
            return reject("Error: el usuario ya existe");   
    });
}


module.exports.all = all;
module.exports.login = login;
module.exports.register = register;

module.exports.default = {
    all,
    login,
    register
}