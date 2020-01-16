let connection =  require('./index');

const SELECT = 'SELECT r.id, r.nombre, r.pasos, r.tiempo, r.imagen, c.nombre, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id';
const GETINGREDIENTS = 'SELECT i.nombre, i.precio, ir.cantidad FROM ingredientesxreceta ir JOIN ingredientes i on ir.id_ingrediente = i.id WHERE ir.id_receta = ?'
const GETRATING = 'SELECT AVG(rr.rating) as rating ,r.id FROM recetas r JOIN rating_receta rr on rr.id_receta = r.id WHERE r.id = ? GROUP BY r.id'
const SEARCH = "SELECT r.id, r.nombre, r.pasos, r.tiempo, r.imagen, c.nombre, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id WHERE r.nombre LIKE '%?%'"
const FINDID = "SELECT r.id, r.nombre, r.pasos, r.tiempo, r.imagen, c.nombre, u.usuario FROM recetas r join usuarios u on r.id_usuario = u.id join categorias c on r.id_categoria = c.id WHERE r.id = ?"

function getRating(id){
    return new Promise((resolve,reject)=>{
        let params = [id]; 
        connection.connection.query(GETRATING, params, (err, result) =>{
            if(err)
                return reject(err);
            else{
                resolve(result.length>0 ? result[0].rating : 0);
            }
            
        });
    });
}

function getIngredients(id){
    return new Promise((resolve,reject)=>{
        let params = [id]; 
        connection.connection.query(GETINGREDIENTS, params, (err, result) =>{
            if(err)
                return reject(err);
            else{
                let ingredientes = []
                let precio = 0;
                for (var i = 0; i < result.length; i++) {
                    let obj = result[i]
                    ingredientes = ingredientes.concat({nombre:obj.nombre, precio:obj.precio, cantidad:obj.cantidad});
                    precio = precio + obj.precio * obj.cantidad;
                }
                resolve({ingredientes:ingredientes, precio:precio});
            }
            
        });
    });
}
async function armarReceta(receta){
    let recetaNueva = receta;
    let ingredientes = await getIngredients(receta.id);
    let rating = await getRating(receta.id);
    recetaNueva.rating = rating;
    recetaNueva.ingredientes = ingredientes.ingredientes;
    recetaNueva.precio = ingredientes.precio;
    return recetaNueva;

}
const all = () =>{ //Retorna todas las recetas
    return new Promise((resolve,reject)=>{
        connection.connection.query(SELECT, async (err, results) =>{
            if(err)
                return reject(err);
            else{
                let newResults = [];
                for(let i = 0; i < results.length; i++){
                    let receta = results[i];
                    receta = await armarReceta(receta);
                    newResults.push(receta);
                }
                resolve({recetas: newResults});
            }
            
        });

    });
}
const search = (name) =>{
    return new Promise((resolve,reject)=>{
        connection.connection.query(SEARCH,[name], async (err, results) =>{
            if(err)
                return reject(err);
            else{
                let newResults = [];
                for(let i = 0; i < results.length; i++){
                    let receta = results[i];
                    receta = await armarReceta(receta);
                    newResults.push(receta);
                }
                resolve({recetas: newResults});
            }
            
        });

    });

}

const find = (id) =>{
    return new Promise((resolve,reject)=>{
        connection.connection.query(FINDID,[id], async (err, results) =>{
            if(err)
                return reject(err);
            else{
                let newResults = [];
                for(let i = 0; i < results.length; i++){
                    let receta = results[i];
                    receta = await armarReceta(receta);
                    newResults.push(receta);
                }
                resolve({recetas: newResults});
            }
            
        });

    });

}

const favoritas = async(idUSuario) =>{
    return new Promise((resolve,reject)=>{
        connection.connection.query(SEARCH,[idUSuario], async (err, results) =>{
            if(err)
                return reject(err);
            else{
                resolve({recetas: results});
            }
            
        });

    });
}
module.exports.all = all;
module.exports.search = search;
module.exports.favoritas = favoritas;
module.export.findId = find;
module.exports.default = {
    all,
    search,
    favoritas,
    find
}