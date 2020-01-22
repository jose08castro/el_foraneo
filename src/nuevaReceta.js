import React from 'react';
import logoUsuario from './images/person.png';
import Cookies from 'universal-cookie';

import Barra from './barra.js';
import Tabla from './tabla.js';

import './nuevaReceta.css'
import { getElementError } from '@testing-library/react';

class NuevaReceta extends React.Component {

    NuevaReceta = async (event) => {
  event.preventDefault();

        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        var nombre = document.getElementById('inputNombreReceta').value;
        var tiempo = document.getElementById('inputTiempoEstimado').value;
        var ingredientes = [
            {
                id: 3,
                nombre: 'Pasta',
                precio: 2000,
                cantidad: 87,

            }, {
                id: 4,
                nombre: 'Tomate',
                precio: '2000',
                cantidad: 15,

            }
        ]
        var pasos = document.getElementById('inputPasos').value;
        var imagen = document.getElementById('inputAgregarImg').value;
        var categoria =1;
        const formData = new FormData(event.target);
        const data = new URLSearchParams(formData);  
        
        var datos = { 
            Nombre:nombre,
            Tiempo:tiempo,
            Ingredientes:ingredientes,
            Pasos:pasos,
            Imagen:imagen,
            Categoria: categoria,
            Usuario:user
        };

        data.append("datos", JSON.stringify(datos));
        await fetch('/addReceta', {
            method: 'POST',
            body: data
        }).then(res => {
            return res.json()
        })
    }



    render() {
        return (
            <div className="alinearCentro">
                <Barra />
                <div className="CuadroNuevaRecetas">
                    <form noValidate onSubmit={this.NuevaReceta}>
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
                                    <div className="NRderB"><input type="file" name="pic" accept="image/*" id="inputAgregarImg" required></input></div>
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
