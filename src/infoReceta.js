import React from 'react';
import Barra from './barra.js';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoCompartir from './images/compartir.png';

import './infoReceta.css';

class InfoReceta extends React.Component {
    constructor(props){
        super();
    }
    renderIngrediente = ({nombre, precio, cantidad},i) => <li key={i}>{nombre} x {cantidad}</li>
    renderRating = () => {
        let rating = []
        //temporal
        let ratingNumber = Math.ceil(this.props.rating);
        // Create filled maruchan
        for(let i = 0; i < ratingNumber ; i++) {
            rating.push(<img key={i} src={logoEF} className="iconos" alt="El Foráneo" />);
        }
        // Create unfilled maruchan
        for(let i = ratingNumber ; i < 5; i++) {
            rating.push(<img key={i}src={logoBN} className="iconos" alt="El Foráneo" />);
        }
        return rating
    }
    renderImage = () =>{
        return <img src={this.props.imagen} className="TamanoFoto" alt="El Foráneo" onClick={this.cargarInformacion} />
    }
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
                                    <label id="NombreUsuarioReceta"> {this.props.usuario} </label>
                                    <label id="TiempoReceta"> {this.props.tiempo} min - {this.props.categoria} </label>
                                </div>
                            </div>
                            <div className="barraIconosReceta">
                                <img src={logoNotificaciones} className="iconos" alt="Notificaciones" />
                                <img src={logoCompartir} className="iconos" alt="Nueva Receta" />
                            </div>
                        </div>
                        <div className="CuerpoRecetaInfo">
                            <div className="FotoRecetaInfo">
                                {this.renderImage()}
                            </div>
                            <div className="PasosRecetaInfo">
                                <h1 id="NombreReceta"> {this.props.nombre}</h1>
                                <label id="Ingredientes">
                                    <ul>
                                    {this.props.ingredientes.map(this.renderIngrediente)}
                                    </ul>
                                </label>
                                <p>{this.props.pasos}</p>
                                <label id="PrecioReceta">Precio estimado: ₡{this.props.precio}</label>
                            </div>
                        </div>
                        <div className="BarraCalificacionesInfo">

                            <div className="Calificaciones">
                            {this.renderRating()}
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        );
    }


}
export default InfoReceta;
