import React from 'react';
import ReactDOM from 'react-dom';

import Publicacion from './publicacion.js';

import './categoria.css';

class Categoria extends React.Component {

    render() {
        return (
            <div className="CuadroCategoria">
                <div className="SuperiorCategoria">
                    <label className="SubtituloFiltro">Desayuno</label>
                </div>
                <div className="ContenedorCategoria">
                    <Publicacion />
                </div>
            </div>
        );
    }


}
export default Categoria;
