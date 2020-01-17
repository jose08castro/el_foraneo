let connection =  require('./index');

const SELECT = 'SELECT r.id, r.nombre, r.pasos, r.tiempo, r.imagen, c.nombre, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id';
const GETINGREDIENTS = 'SELECT i.nombre, i.precio, ir.cantidad FROM ingredientesxreceta ir JOIN ingredientes i on ir.id_receta = i.id WHERE ir.id_receta = ?'
const GETRATING = 'SELECT AVG(rr.rating),r.id FROM recetas r JOIN rating_receta rr on rr.id_receta = r.id WHERE r.id = ? GROUP BY r.id'
const SEARCH = "SELECT r.id, r.nombre, r.pasos, r.tiempo, r.imagen, c.nombre, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id WHERE r.nombre LIKE '%?%'"
let params = [];

const all = async () =>{ //Retorna todas las recetas
    return new Promise((resolve,reject)=>{

        connection.connection.query(SELECT, (err, results) =>{
            if(err)
                return reject(err);
            
            return (err) ?  reject(err) : resolve({usuarios: results});
        });

    });
}
const search = async (usuario,password) =>{
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

// const insert = async (nombre,pasos,tiempo,imagen,categoria,usuario) =>{
//     return new Promise((resolve,reject) =>{
//         let sql = "INSERT INTO recetas (nombre,pasos,tiempo,imagen,categoria,usuario) VALUES (?,?,?,?,?,?)"
//         let params = [nombre,pasos,tiempo,imagen,categoria,usuario];

//         connection.connection.query(sql,params, (err, results) =>{
//             return (err) ?  reject(err) : resolve({result: results.length});
//         });

//         let sql1= "INSERT INTO ingredientesxreceta (id_ingrediente,id_receta,cantidad) VALUES (?,?,?)"
//         let params = [ id_ingrediente, id_receta,cantidad];
       
//         connection.connection.query(sql,params, (err, results) =>{
//             return (err) ?  reject(err) : resolve({result: results.length});
//         });

//     });
// }

const search = async (usuario,password) =>{
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

// const me_gusta = async (id_receta,id_usuario,rating) => {
//     return new Promise((resolve,reject) =>{
//         let sql = "INSERT INTO  rating_receta (id_receta, id_usuario, rating) VALUES (?,?,?)"
//         let params = [id_receta,id_usuario,rating];

//         connection.connection.query(sql,params, (err, results) =>{
//             return (err) ?  reject(err) : resolve({result: results.length});
//         });
//     });
// }


const favoritas = async(id) =>{

}
module.exports.all = all;
module.exports.search = search;
module.exports.favoritas = favoritas;
module.exports.default = {
    all,
    search,
     favoritas//,
    // insert,
    // me_gusta
}