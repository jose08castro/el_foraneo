import React from 'react';
import ReactDOM from 'react-dom';

import Publicacion from './publicacion.js';

import './categoria.css';

class Categoria extends React.Component {
    renderReceta = ({ id, nombre, pasos, tiempo, imagen, categoria, usuario, rating, ingredientes, precio }) =>
        <Publicacion
            key={id}
            idReceta={id}
            nombre={nombre}
            pasos={pasos}
            tiempo={tiempo}
            imagen={imagen}
            categoria={categoria}
            usuario={usuario}
            rating={rating}
            ingredientes={ingredientes}
            precio={precio} />;
    constructor(props) {
        super(props)
        this.state = {
            resumen: [],
            ingredientes: []
        };
    }
    renderIngredientes = ({ cantidad, nombre }) => <tr><td>x{cantidad}</td><td>{nombre}</td></tr>
    renderResumen = ({ cantidad, nombre }) => <tr><td>{nombre}</td><td>x{cantidad}</td></tr>
    async componentDidMount() {
        var thingsArray = []
        var ingredientArray = []
        var id = 0;
        var counted = []
        var ingredientsCount = { };

        for (let i = 0; i < this.props.recetas.length; i++) {
            id = this.props.recetas[i];
            if (!counted.includes(id.id)) {
                var count = this.props.recetas.reduce(function (n, val) {
                    return n + (val.id === id.id);
                }, 0);
                thingsArray.push({ nombre: id.nombre, cantidad: count });
                counted.push(id.id);
            }
            for (var j = 0; j < id.ingredientes.length; j++) {
                ingredientsCount[id.ingredientes[j].nombre] = (ingredientsCount[id.ingredientes[j].nombre] || 0) + id.ingredientes[j].cantidad;
             }
        }
        Object.keys(ingredientsCount).forEach(function(key,index) {
            ingredientArray.push({nombre: key, cantidad:ingredientsCount[key]});
        });
        console.log(ingredientArray);
        this.setState({
            resumen: thingsArray,
            ingredientes: ingredientArray
        });
        console.log(this.state.resumen);
    }
    getPrecio = () => {
        let precio = 0;
        for (let i = 0; i < this.props.recetas.length; i++) {
            precio = precio + this.props.recetas[i].precio;
        }
        return precio;
    }
    render() {
        return (
            <div className="CuadroCategoria">
                <div className="SuperiorCategoria">
                    <label className="SubtituloFiltro">{this.props.categoria}</label>
                </div>
                <div className="ContenedorCategoria">
                    {this.props.recetas.map(this.renderReceta)}
                </div>
                <div className="CuadroResumen">
                    <div className="SuperiorFiltrosPlan">
                        <label className="SubtituloFiltro">Resumen del plan</label>
                    </div>
                    <div className="ContenedorResumen">
                        <div className="InteriorResumen">
                            <div className="CuadroDatos">
                                <p className="PrecioResumen">Costo total: ₡{this.getPrecio()}</p>
                                <table>
                                    <tbody>
                                        {this.state.resumen.map(this.renderResumen)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="CuadroDatos">
                                <p className="PrecioResumen">Ingredientes</p>
                                <table>
                                    <tbody>
                                        {this.state.ingredientes.map(this.renderResumen)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
export default Categoria;
