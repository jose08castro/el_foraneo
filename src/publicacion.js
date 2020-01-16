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
    constructor(props){
        super();
    }
    cargarInformacion() {
        ReactDOM.render(<InfoReceta />, document.getElementById('root'));
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
            <div className="CuadroRecetas">
                <div className="HeadReceta">
                    <div className="Info">
                        <img src={logoUsuario} className="iconos" alt="Notificaciones" />
                        <div className="tiempo" >
                            <label id="NombreUsuarioReceta"> {this.props.usuario}  </label>
                            <label id="TiempoReceta"> {this.props.tiempo} min - {this.props.categoria} </label>
                        </div>
                    </div>
                    <div className="barraIconosReceta">
                        <img src={logoNotificaciones} className="iconos" alt="Notificaciones" />
                        <img src={logoCompartir} className="iconos" alt="Nueva Receta" />
                    </div>
                </div>
                <div className="CuerpoReceta">
                    <div className="FotoReceta">
                        {this.renderImage()}
                    </div>
                    <div className="PasosReceta">
                        <div className="Instrucciones">
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
                </div>
                <div className="BarraCalificaciones">

                    <div className="Calificaciones">
                        {this.renderRating()}
                    </div>

                </div>
            </div>
        );
    }


}
export default Publicacion;
