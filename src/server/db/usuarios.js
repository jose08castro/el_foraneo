connection =  require('./index');

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
module.exports.all = all;
module.exports.login = login;

module.exports.default = {
    all,
    login
}