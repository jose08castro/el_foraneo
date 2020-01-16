import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown'

import Publicacion from './publicacion.js';
import Barra from './barra.js';
import PlanAlimenticio from './planAlimenticio.js';


import './principal.css';


import ReactSearchBox from 'react-search-box';
// Esta funcion se supone que le da el estilo al Toggle del Dropdown

const CustomToggle1 = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
        className="DropFiltro"
    >
        {children}
        &#x25bc;
    </a>
));


class Principal extends React.Component {
    generarPlan() {
        ReactDOM.render(<PlanAlimenticio />, document.getElementById('root'));
    }

    render() {
        return (
            <div className="App">
                <Barra />
                <div className="App-contenido">
                    <div className="Muro">

                        <div className="CuadroFiltros">
                            <div className="SuperiorFiltros">
                                <label className="Subtitulo">Filtros</label>
                                <button className="ButonGenerar" onClick={this.generarPlan}> Generar Plan </button>
                            </div>
                            <div className="InteriorCuadroFiltros">
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle1}>Organizar</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Action</Dropdown.Item>
                                        <Dropdown.Item >Another action</Dropdown.Item>
                                        <Dropdown.Item >Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle1}>Categoria</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Action</Dropdown.Item>
                                        <Dropdown.Item >Another action</Dropdown.Item>
                                        <Dropdown.Item >Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle1}>Rango de Precios</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Puto</Dropdown.Item>
                                        <Dropdown.Item >Tapia</Dropdown.Item>
                                        <Dropdown.Item >Playo</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Publicacion />
                        <Publicacion />
                        <Publicacion />

                    </div>
                    <div className="Favoritos">

                        <div className="HeaderFavoritos">
                            Mis Recetas Favoritas
                        </div>
                        <div className="RecetasFavoritas">
                            <ul>
                                <li>
                                    Receta1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </li>
                                <li>
                                    Receta2
                                </li>
                                <li>
                                    Receta1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </li>
                                <li>
                                    Receta2
                                </li>                            <li>
                                    Receta1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </li>
                                <li>
                                    Receta2
                                </li>                            <li>
                                    Receta1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </li>
                                <li>
                                    Receta2
                                </li>                            <li>
                                    Receta1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </li>
                                <li>
                                    Receta2
                                </li>                            <li>
                                    Receta1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </li>
                                <li>
                                    Receta2
                                </li>

                            </ul>
                        </div>


                    </div>
                </div>
            </div >


        );
    }


}
export default Principal;
