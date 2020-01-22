import React from 'react';
import logoUsuario from './images/person.png';

import Barra from './barra.js';
import Tabla from './tabla.js';

import './nuevaReceta.css'

class NuevaReceta extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categorias: [],
            categoria: "",
            ingredientes:[]
        };
    }
    updateValues = async() =>{
        let resp = await fetch('/categorias');
        let categorias = await resp.json();
        
        this.setState({
            categorias: categorias.categorias
        });
    }
    async componentDidMount() {
        this.updateValues();
    }
    renderCategoria = ({ id, nombre }) => <option key={id} value={id}>{nombre}</option>
    updateIngredientes = async(ingredientes) =>{
        this.setState({
            ingredientes:ingredientes
        });
    }
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
                                    <div className="NRizq">Categoria:</div>
                                    <div className="NRder">
                                        <select className="DropFiltroPlan" value={this.state.categoria} onChange={(e) => { this.setState({ categoria: e.target.value }) }}>
                                        <option key={0} value={"0"} hidden disabled>Categoría</option>
                                        {this.state.categorias.map(this.renderCategoria)}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="NRrow">
                                    <div className="NRizq">Agregar ingrediente:</div>
                                    <div className="NRfull"><Tabla update={this.updateIngredientes}/></div>
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
