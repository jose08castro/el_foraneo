import React from 'react';
import Barra from './barra.js';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoCompartir from './images/compartir.png';

import FotoPasta from './images/pasta.png'
import FotoChifrijo from './images/chifrijo.png'


import './infoReceta.css';

class InfoReceta extends React.Component {
    render() {
        return (
            <div className="App">
                <Barra />
                <div className="FondoInfo">
                    <div className="CuadroRecetaInfo">
                        <div className="HeadRecetaInfo">
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
                        <div className="CuerpoRecetaInfo">
                            <div className="FotoRecetaInfo">
                                <img src={FotoChifrijo} className="TamanoFotoInfo" alt="El Foráneo" />
                            </div>
                            <div className="PasosRecetaInfo">
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
                            </div>
                        </div>
                        <div className="BarraCalificacionesInfo">

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
            </div >
        );
    }


}
export default InfoReceta;
