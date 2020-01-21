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
    constructor(props) {
        super(props)
        this.state = { render: false, notificaciones: []}
    }
    stateB = { renderB: false };

    async componentDidMount(){
        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        let resp = await fetch(`/notificaciones?id_usuario=${encodeURIComponent(user)}`);
        let notificaciones = await resp.json();
        this.setState({notificaciones:notificaciones.notificaciones.notificaciones});
    }
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

    ingBusqueda = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
        ReactDOM.render(<Busqueda key={event.target[0].value} search={event.target[0].value}/>, document.getElementById('root'));
    }

    render() {
        return (
            <div className="BarraPrincipal">
                <div className="BarraInicio">
                    <img src={logoEF} className="ElForaneoP" alt="El Foráneo" onClick={() => this.ingPrincipal()} />
                    <h1 className="Titulo">El Foráneo</h1>
                </div>
                <div className="BarraBusqueda" >
                    <form onSubmit={this.ingBusqueda}>
                    <input placeholder="Búsqueda..." type="text"  name="usuario"></input>
                    </form>
                </div>
                <div className="barraIconos">
                    <img src={logoExplorar} className="iconos" alt="Explorar" onClick={() => this.ingPrincipal()} />
                    <img src={logoUsuario} className="iconos" alt="Mi perfil" onClick={() => this.ingPerfil()} />
                    <div className="notificationContainer">
                    <img src={logoNotificaciones} className="iconos" id="iconoNotificacion"alt="Notificaciones" onClick={() => this.displNotificacion()} />
                    <div className="PosicionNotificacion">{this.state.render && <Notificacion notificaciones={this.state.notificaciones}/>}</div>
                    </div>
                    <img src={logoNuevaReceta} className="iconos" alt="Nueva Receta" onClick={() => this.ingNuevaReceta()} />
                    <img src={logoLogout} className="iconos" alt="Cerrar Sesion" onClick={() => this.cerrarSesion()} />
                </div>
            </div>
        );
    }


}
export default Barra;
