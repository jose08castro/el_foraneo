import React from 'react';
import ReactDOM from 'react-dom';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoCompartir from './images/compartir.png';

import FotoPasta from './images/pasta.png'
import FotoChifrijo from './images/chifrijo.png'

import InfoReceta from './infoReceta.js';

class Publicacion extends React.Component {
    cargarInformacion() {
        ReactDOM.render(<InfoReceta />, document.getElementById('root'));
    }

    render() {
        return (
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
                        <img src={FotoChifrijo} className="TamanoFoto" alt="El Foráneo" onClick={this.cargarInformacion} />
                    </div>
                    <div className="PasosReceta">
                        <div className="Instrucciones">
                            <h1 id="NombreReceta"> Pasta Carbonara</h1>
                            <label id="Ingredientes">
                                <ul>
                                    <li>Tomate</li>
                                    <li>Chile Dulce</li>
                                    <li>Cebolla</li>
                                </ul>
                            </label>
                            <label id="PrecioReceta">Precio estimado</label>
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
        );
    }


}
export default Publicacion;
