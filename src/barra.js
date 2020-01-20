import React from 'react';
import ReactDOM from 'react-dom';
import logoEF from './images/logo.png';
import logoExplorar from './images/explore.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoNuevaReceta from './images/nuevaReceta.png';
import Principal from './principal.js';
import Cookies from 'universal-cookie';

import './principal.css';

import logoLogout from './images/logout.png'

import './principal.css';
import App from './App.js'
import Perfil from './perfil.js'
import NuevaReceta from './nuevaReceta.js';
import Notificacion from './notificacion.js'
import Busqueda from './busqueda.js'


class Barra extends React.Component {

    state = { render: false }
    stateB = { renderB: false }

    displNotificacion() {
        this.setState({ render: !this.state.render })
    }

    ingPrincipal() {
        ReactDOM.render(<Principal />, document.getElementById('root'));
    }

    ingPerfil() {
        ReactDOM.render(<Perfil />, document.getElementById('root'));
    }

    ingNuevaReceta() {
        ReactDOM.render(<NuevaReceta />, document.getElementById('root'));
    }

    cerrarSesion() {
        const cookie = new Cookies();
        cookie.remove('USER');
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.ingBusqueda();
        }
    }

    ingBusqueda() {
        ReactDOM.render(<Busqueda />, document.getElementById('root'));
    }

    render() {
        return (
            <div className="BarraPrincipal">
                <div className="BarraInicio">
                    <img src={logoEF} className="ElForaneoP" alt="El Foráneo" onClick={() => this.ingPrincipal()} />
                    <h1 className="Titulo">El Foráneo</h1>
                </div>
                <div className="BarraBusqueda" >
                    <input placeholder="Búsqueda..." type="text" onKeyDown={this._handleKeyDown}></input>
                    {/* <ReactSearchBox
                        placeholder="Buscar"
                        inputBoxFontColor="red"
                        // onFocus={() => {
                        //     this.ingBusqueda()
                        // }}
                        onSelect={this.ingBusqueda()}
                        // onChange={this.ingBusqueda()}
                        // onFocus={() => {
                        //     this.ingBusqueda();
                        // }}
                    /> */}
                </div>
                <div className="barraIconos">
                    <img src={logoExplorar} className="iconos" alt="Explorar" onClick={() => this.ingPrincipal()} />
                    <img src={logoUsuario} className="iconos" alt="Mi perfil" onClick={() => this.ingPerfil()} />
                    <div className="notificationContainer">
                    <img src={logoNotificaciones} className="iconos" id="iconoNotificacion"alt="Notificaciones" onClick={() => this.displNotificacion()} />
                    <div className="PosicionNotificacion">{this.state.render && <Notificacion />}</div>
                    </div>
                    <img src={logoNuevaReceta} className="iconos" alt="Nueva Receta" onClick={() => this.ingNuevaReceta()} />
                    <img src={logoLogout} className="iconos" alt="Cerrar Sesion" onClick={() => this.cerrarSesion()} />
                </div>
            </div>
        );
    }


}
export default Barra;
