import React from 'react';
import logoUsuario from './images/person.png';
import beeperNub from './images/beeperNub.png';

import './notificacion.css';


// import ReactSearchBox from 'react-search-box';

class Notificacion extends React.Component {
    renderNotificacion = ({mensaje}) =>
            <div className="row">
                        <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 NotificacionFoto"><img src={logoUsuario} className="iconos" alt="Mi perfil" /></div>
                        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10 NotificacionContenido">{mensaje}</div>
            </div>
    render() {
        return (
            <div>
                <div><img src={beeperNub} className="beeperNubIcon" alt="beeperNub" /></div>
                <div className="NotificacionContenedor">
                    {
                    this.props.notificaciones.length>0 ? this.props.notificaciones.map(this.renderNotificacion) : <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10 NotificacionContenido">Todavía no tiene notificaciones!</div>
                        }
                </div>
            </div>
        );
    }
}
export default Notificacion;
