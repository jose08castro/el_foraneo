import React from 'react';
import logo from './logo.svg';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoExplorar from './images/explore.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoNuevaReceta from './images/nuevaReceta.png';
import logoCompartir from './images/compartir.png';
import Dropdown from 'react-bootstrap/Dropdown'

import FotoPasta from './images/pasta.png'
import FotoChifrijo from './images/chifrijo.png'


import './principal.css';


import ReactSearchBox from 'react-search-box';
import styled from 'styled-components';
// Esta funcion se supone que le da el estilo al Toggle del Dropdown
const CustomToggle = React.forwardRef(({ children, onClick, style }, ref) => (
    <a
        ref={ref}
        onClick={e => { e.preventDefault(); onClick(e); }}

    >
        {children}
        {/* &#x25bc;   */}
        {/* style={ "color:white"} */}
        {/* {{color:'white'}} */}

    </a>

));

const CustomToggle1 = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));


class App extends React.Component {
    iniciarSesion() {

    }

    render() {
        return (
            <div className="App">
                <div className="Barra">
                    <div className="BarraInicio">
                        <img src={logoEF} className="ElForaneo" alt="El Foráneo" />
                        <h1>El Foráneo</h1>
                    </div>
                    <div className="BarraBusqueda" >
                        <ReactSearchBox
                            placeholder="Buscar"
                            inputBoxFontColor="red"
                            onFocus={() => {
                                console.log('This function is called when is focussed')
                            }}
                        />
                    </div>
                    <div className="barraIconos">
                        <img src={logoExplorar} className="iconos" alt="Explorar" />
                        <img src={logoNotificaciones} className="iconos" alt="Notificaciones" />
                        <img src={logoNuevaReceta} className="iconos" alt="Nueva Receta" />
                        <img src={logoUsuario} className="iconos" alt="Mi perfil" />
                    </div>
                </div>
                <div className="App-contenido">
                    <div className="muro">

                        <div className="CuadroFiltros">
                            <div className="Superior">
                                <label className="Subtitulo">Filtros</label>
                                <button className="ButonGenerar"> Generar Plan </button>
                            </div>
                            <div className="InteriorCuadro2">
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
                                    <Dropdown.Toggle as={CustomToggle}>Categoria</Dropdown.Toggle>
                                    <Dropdown.Toggle as={CustomToggle}>Rango de Precios</Dropdown.Toggle>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="CuadroRecetas">
                            <div className="HeadReceta">
                                <div className="Info">
                                    <img src={logoUsuario} className="iconos" alt="Notificaciones" />
                                    <div className="tiempo" >
                                        <label id="NombreUsuarioReceta"> Nombre Usuario </label>
                                        <label id="TiempoReceta"> 45 min </label>
                                    </div>
                                </div>
                                <div className="barraIconosReceta">
                                    <img src={logoNotificaciones} className="iconos" alt="Notificaciones" />
                                    <img src={logoCompartir} className="iconos" alt="Nueva Receta" />
                                </div>
                            </div>
                            <div className="CuerpoReceta">
                                <div className="FotoReceta">
                                    <img src={FotoPasta} className="TamanoFoto" alt="El Foráneo" />
                                </div>
                                <div className="PasosReceta">
                                    <div className="Instrucciones">
                                        <p>
                                            <h1 id="NombreReceta"> Pasta Carbonara</h1>
                                            <label id="Ingredientes">
                                                <ul>
                                                <li>Tomate</li>
                                                <li>Chile Dulce</li>
                                                <li>Cebolla</li>
                                                </ul>
                                            </label>
                                            <p>
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            Aqui van los pasos de la receta
                                            </p>
                                            <label id="PrecioReceta">Precio estimado</label>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="BarraCalificaciones">

                                <div className="Calificaciones">
                                    <img src={logoEF} className="iconos" alt="El Foráneo" />
                                    <img src={logoEF} className="iconos" alt="El Foráneo" />
                                    <img src={logoBN} className="iconos" alt="El Foráneo" />
                                    <img src={logoBN} className="iconos" alt="El Foráneo" />
                                    <img src={logoBN} className="iconos" alt="El Foráneo" />
                                </div>

                            </div>
                        </div>



                    </div>
                    <div className="Favoritos">

                        <div className="HeaderFavoritos">
                            Mis Recetas Favoritas
                        </div>
                        <div className="RecetasFavoritas">
                            <ul>
                                <li>
                                    Receta1
                                </li>
                                <li>
                                    Receta2
                                </li>

                            </ul>
                        </div>


                    </div>
                </div>
            </div>


        );
    }


}
export default App;
