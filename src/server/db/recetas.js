let connection = require('./index');

const SELECT = 'SELECT r.id, r.nombre as nombre, r.pasos, r.tiempo, r.imagen, c.nombre as categoria, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id';
const GETINGREDIENTS = 'SELECT i.nombre, i.precio, ir.cantidad FROM ingredientesxreceta ir JOIN ingredientes i on ir.id_ingrediente = i.id WHERE ir.id_receta = ?'
const GETRATING = 'SELECT AVG(rr.rating) as rating ,r.id FROM recetas r JOIN rating_receta rr on rr.id_receta = r.id WHERE r.id = ? GROUP BY r.id'
const SEARCH = "SELECT r.id, r.nombre as nombre, r.pasos, r.tiempo, r.imagen, c.nombre as categoria, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id WHERE r.nombre LIKE ? or r.pasos LIKE ?"
const FINDID = "SELECT r.id, r.nombre as nombre, r.pasos, r.tiempo, r.imagen, c.nombre as categoria, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id WHERE r.id = ?"
const GETCATEGORY = "SELECT id, nombre FROM categorias";
const GETFAVORITAS = "SELECT r.id, r.nombre FROM recetas_favoritas rf join recetas r on rf.id_receta = r.id WHERE rf.id_usuario = ?"
const PLAN = 'CALL sp_get_plan_recetas(?,?,?,?)'
const LIKE = 'INSERT INTO recetas_favoritas(id_receta,id_usuario) values(?,?)'
const UNLIKE = 'DELETE from recetas_favoritas where id_receta=? AND id_usuario=?'
const RATE = 'INSERT INTO rating_receta(id_receta,id_usuario,rating) values(?,?,?)'
const UPDATERATE = 'UPDATE rating_receta SET rating=? WHERE id_receta=? AND id_usuario=?'

function getRating(id) {
    return new Promise((resolve, reject) => {
        let params = [id];
        connection.connection.query(GETRATING, params, (err, result) => {
            if (err)
                return reject(err);
            else {
                resolve(result.length > 0 ? result[0].rating : 0);
            }

        });
    });
}

function getIngredients(id) {
    return new Promise((resolve, reject) => {
        let params = [id];
        connection.connection.query(GETINGREDIENTS, params, (err, result) => {
            if (err)
                return reject(err);
            else {
                let ingredientes = []
                let precio = 0;
                for (var i = 0; i < result.length; i++) {
                    let obj = result[i]
                    ingredientes = ingredientes.concat({ nombre: obj.nombre, precio: obj.precio, cantidad: obj.cantidad });
                    precio = precio + obj.precio * obj.cantidad;
                }
                resolve({ ingredientes: ingredientes, precio: precio });
            }

        });
    });
}
async function armarReceta(receta) {
    let recetaNueva = receta;
    let ingredientes = await getIngredients(receta.id);
    let rating = await getRating(receta.id);
    recetaNueva.rating = rating;
    recetaNueva.ingredientes = ingredientes.ingredientes;
    recetaNueva.precio = ingredientes.precio;
    var buffer = Buffer.from(receta.imagen);
    var bufferBase64 = buffer.toString('base64');
    recetaNueva.imagen = "data:image/jpg;base64," + bufferBase64;//
    return recetaNueva;

}
const all = () => { //Retorna todas las recetas
    return new Promise((resolve, reject) => {
        connection.connection.query(SELECT, async (err, results) => {
            if (err)
                return reject(err);
            else {
                let newResults = [];
                for (let i = 0; i < results.length; i++) {
                    let receta = results[i];
                    receta = await armarReceta(receta);
                    newResults.push(receta);
                }
                resolve({ recetas: newResults });
            }

        });

    });
}
const search = (name) => {
    return new Promise((resolve, reject) => {
        name = "%" + name + "%"
        connection.connection.query(SEARCH, [name,name], async (err, results) => {
            if (err)
                return reject(err);
            else {
                let newResults = [];
                for (let i = 0; i < results.length; i++) {
                    let receta = results[i];
                    receta = await armarReceta(receta);
                    newResults.push(receta);
                }
                resolve({ recetas: newResults });
            }

        });

    });

}

const find = (id) => {
    return new Promise((resolve, reject) => {
        connection.connection.query(FINDID, [id], async (err, results) => {
            if (err)
                return reject(err);
            else {
                let newResults = [];
                for (let i = 0; i < results.length; i++) {
                    let receta = results[i];
                    receta = await armarReceta(receta);
                    newResults.push(receta);
                }
                resolve({ recetas: newResults });
            }

        });

    });

}

const favoritas = async (idUsuario) => {
    return new Promise((resolve, reject) => {
        connection.connection.query(GETFAVORITAS, [idUsuario], async (err, results) => {
            if (err)
                return reject(err);
            else {
                resolve({ recetas: results });
            }

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




// const me_gusta = async (id_receta,id_usuario,rating) => {
//     return new Promise((resolve,reject) =>{
//         let sql = "INSERT INTO  rating_receta (id_receta, id_usuario, rating) VALUES (?,?,?)"
//         let params = [id_receta,id_usuario,rating];

//         connection.connection.query(sql,params, (err, results) =>{
//             return (err) ?  reject(err) : resolve({result: results.length});
//         });
//     });
// }



// const categorias = async () =>{
//     return new Promise((resolve,reject)=>{
//         connection.connection.query(GETCATEGORY, async (err, results) =>{
//             if(err)
const categorias = async () => {
    return new Promise((resolve, reject) => {
        connection.connection.query(GETCATEGORY, async (err, results) => {
            if (err)
                return reject(err);
            else {
                resolve({ categorias: results });
            }

        });

    });
}


const plan = async (min, max, id_categoria, cantidad) => {
    return new Promise((resolve, reject) => {
        connection.connection.query(PLAN, [min, max, id_categoria, cantidad], async (err, results) => {
            if (err)
                return reject(err);
            else {
                let newResults = [];
                for (let i = 0; i < results[0].length; i++) {
                    let receta = results[0][i];
                    if (typeof receta !== "undefined") {
                        receta = await armarReceta(receta);
                        newResults.push(receta);
                    }
                }
                resolve({ recetas: newResults });
            }

        });

    });
}

const like = async (id_receta, id_usuario) => {
    return new Promise((resolve, reject) => {
        connection.connection.query(UNLIKE, [id_receta, id_usuario], async (err, results) => {
            if (err)
                return reject(err);
            else {
                if (results.affectedRows === 0) {
                    connection.connection.query(LIKE, [id_receta, id_usuario], async (err, results) => {
                        if (err)
                            return reject(err);
                        else {
                            return (results.affectedRows > 0) ? (resolve({result : true})) : (resolve({result : false}))
                        }
                    });
                }
                else{
                    return (resolve({deleted:true}));
                }
            }
        });

    });
}

const rate = async (id_receta, id_usuario, rating) => {
    return new Promise((resolve, reject) => {
        connection.connection.query(UPDATERATE, [rating,id_receta, id_usuario], async (err, results) => {
            if (err)
                return reject(err);
            else {
                if (results.affectedRows === 0) {
                    connection.connection.query(RATE, [id_receta, id_usuario, rating], async (err, results) => {
                        if (err)
                            return reject(err);
                        else {
                            return (results.affectedRows > 0) ? (resolve({result : true})) : (resolve({result : false}))
                        }
                    });
                }
                else{
                    return (resolve({deleted:true}));
                }
            }
        });

    });
}

module.exports.all = all;
module.exports.search = search;
module.exports.favoritas = favoritas;
module.exports.find = find;
module.exports.categorias = categorias;
module.exports.plan = plan;
module.exports.like = like;
module.exports.rate = rate;

module.exports.default = {
    all,
    search,
    // insert,
    // me_gusta
    favoritas,
    find,
    categorias,
    plan,
    like,
    rate
}