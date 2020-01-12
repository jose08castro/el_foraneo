import React from 'react';
import logo from './logo.svg';
import logoEF from './images/logo.png';
import logoExplorar from './images/explore.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoNuevaReceta from './images/nuevaReceta.png';
import Dropdown from 'react-bootstrap/Dropdown'

import './principal.css';


import ReactSearchBox from 'react-search-box';
import styled from 'styled-components';
// Esta funcion se supone que le da el estilo al Toggle del Dropdown
const CustomToggle = React.forwardRef(({ children, onClick ,style}, ref) => ( 
    <a        
        ref={ref}
         onClick={e => { e.preventDefault(); onClick(e); }}
    >
        {children}
        &#x25bc;  
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
                <div className="App-header">
                    <div className="CuadroRecetas">
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

                            </Dropdown>

                        </div>
                    </div>
                </div>
            </div>

        );
    }


}
export default App;
