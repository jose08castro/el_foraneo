import React from 'react';
import logoUsuario from './images/person.png';
import beeperNub from './images/beeperNub.png';

import './notificacion.css';

import Dropdown from 'react-bootstrap/Dropdown'

// import ReactSearchBox from 'react-search-box';

class Notificacion extends React.Component {
    render() {
        return (
            <div>
                <div><img src={beeperNub} className="beeperNubIcon" alt="beeperNub" /></div>
                <div className="NotificacionContenedor">
                    <div className="row">
                        <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 NotificacionFoto"><img src={logoUsuario} className="iconos" alt="Mi perfil" /></div>
                        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10 NotificacionContenido">Casasola te ha dado 5 maruchanes</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 NotificacionFoto"><img src={logoUsuario} className="iconos" alt="Mi perfil" /></div>
                        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10 NotificacionContenido">Tapia te ha dado 2 maruchanes</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 NotificacionFoto"><img src={logoUsuario} className="iconos" alt="Mi perfil" /></div>
                        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10 NotificacionContenido">Ángelo te ha dado 1 maruchan</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Notificacion;
