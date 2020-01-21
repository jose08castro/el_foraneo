import React from 'react';
import logoUsuario from './images/person.png';

import Barra from './barra.js';
import Tabla from './tabla.js';

import './nuevaReceta.css'

class NuevaReceta extends React.Component {
    render() {
        return (
            <div className="alinearCentro">
                <Barra />
                <div className="CuadroNuevaRecetas">
                    <form>
                        <div className="HeadReceta">
                            <div className="Info">
                                <img src={logoUsuario} className="iconos" alt="Notificaciones" />
                                <div className="tiempo" >
                                    <p className="NuevaReceta"> Nueva Receta </p>
                                </div>
                            </div>
                        </div>
                        <div className="CuerpoNuevaReceta">
                            <div className="NRcentrar">
                                <div className="NRrow">
                                    <div className="NRizq">Nombre receta:</div>
                                    <div className="NRder"><input className="NRInput" type="text" id="inputNombreReceta" required></input></div>
                                </div>
                                <div className="NRrow">
                                    <div className="NRizq">Tiempo estimado:</div>
                                    <div className="NRder"><input className="NRInput" type="text" id="inputTiempoEstimado" required></input></div>
                                </div>
                                <div className="NRrow">
                                    <div className="NRizq">Agregar ingrediente:</div>
                                    <div className="NRfull"><Tabla /></div>
                                </div>
                                <div className="NRrow">
                                    <div className="NRizq">Pasos para elaborar:</div>
                                    <div className="NRder"><textarea className="NRInput" type="text" id="inputPasos" rows="5" required /></div>
                                </div>
                                <div className="NRrow">
                                    <div className="NRizq">Agregar imagen:</div>
                                    <div className="NRder"><input type="file" name="pic" accept="image/*" id="inputAgregarImg" required></input></div>
                                </div>
                            </div>
                        </div>
                        <div className="BarraCalificaciones">
                            <div className="NRbotonDer">
                                <button className="NRboton">Agregar Receta</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default NuevaReceta;
