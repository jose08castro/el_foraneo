import React from 'react';
import logo from './logo.svg';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoExplorar from './images/explore.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoNuevaReceta from './images/nuevaReceta.png';
import Dropdown from 'react-bootstrap/Dropdown'

import Publicacion from './publicacion.js';
import Barra from './barra.js';


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
    render() {
        return (
            <div className="App">
                <Barra />
                <div className="App-contenido">
                    <div className="Muro">

                        <div className="CuadroFiltros">
                            <div className="SuperiorFiltros">
                                <label className="Subtitulo">Filtros</label>
                                <button className="ButonGenerar"> Generar Plan </button>
                            </div>
                            <div className="InteriorCuadroFiltros">
                                <link
                                    rel="stylesheet"
                                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                                    crossorigin="anonymous"
                                />
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
