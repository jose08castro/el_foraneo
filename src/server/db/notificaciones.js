let connection =  require('./index');

const GETALL = 'SELECT mensaje from notificaciones where id_usuario=?';
const GETUNREAD = 'SELECT sum(notificaciones.leida = 0) as sinleer from notificaciones where id_usuario=?';
const READALL = 'UPDATE notificaciones set leida=1 WHERE id_usuario=?';
const INSERTNOTIFICATION = 'INSERT into notificaciones(id_usuario,leida,mensaje) values (?,0,?)';

const all = async (id) =>{
    let params = [id];
    return new Promise((resolve,reject)=>{
        let unread = 0;
        connection.connection.query(GETUNREAD,params, (err, results) =>{
            if(!err)
                unread = results[0].sinleer; 
        }
        )
        connection.connection.query(GETALL,params, (err, results) =>{
            return (err) ?  reject(err) : resolve({
                notificaciones: results,
                sinleer : unread
            });
        });

    });
}

const readall = async (id) =>{
    return new Promise((resolve,reject) =>{
        let params = [id];
        connection.connection.query(READALL,params, (err, results) =>{
            return (err) ?  reject(err) : resolve({result: results.length});
        });
    });
}

const insert = async(id_usuario,mensaje) =>{
    return new Promise((resolve,reject) =>{
        let params = [id_usuario, mensaje];
        connection.connection.query(INSERTNOTIFICATION,params, (err, results) =>{
            return (err) ?  reject(err) : resolve({result: results.length});
        });
    });
}

module.exports.all = all;
module.exports.readall = readall;
module.exports.insert = insert;

module.exports.default = {
    all,
    readall,
    insert
}