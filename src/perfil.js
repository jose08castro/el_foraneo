import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown'

import Publicacion from './publicacion.js';
import Barra from './barra.js';

import './principal.css';
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


class Perfil extends React.Component {
    userName = "José Evelio Castro Quesada";
    userNickName = "jose08castro";
    render() {
        return (
            <div className="App">
                <Barra />
                <div className="App-contenido">
                    <div className="Muro">
                        <div class="Nombreperfil">
                            <div class="Parriba"><p class="PdistanciaMargin">{this.userName}</p></div>
                            <div class="PdistanciaMargin"><p>{this.userNickName}</p></div>
                            {/* <button class="BcerrarSesion">Cerrar Sesión</button> */}
                        </div>
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
                    </div>
                </div>
            </div >


        );
    }


}
export default Perfil;
