import React from 'react';
import ReactDOM from 'react-dom';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoCompartir from './images/compartir.png';
import Cookies from 'universal-cookie';

import InfoReceta from './infoReceta.js';

class Publicacion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            errorMessage: ""
        };
    }
    cargarInformacion = () =>{
        let info = <InfoReceta     
        key = {this.props.key}
        idReceta={this.props.idReceta} 
        nombre={this.props.nombre} 
        pasos={this.props.pasos} 
        tiempo={this.props.tiempo} 
        imagen={this.props.imagen}
        categoria={this.props.categoria} 
        usuario={this.props.usuario}
         rating={this.props.rating} 
         ingredientes={this.props.ingredientes} 
         precio={this.props.precio}/>
        ReactDOM.render(info, document.getElementById('root'));
    }
    likePublicacion = async () =>{
        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        await fetch(`/like?id_receta=${this.props.idReceta}&id_usuario=${user}`)
         .then(res => {
            return res.json()
          })
            .then(resp => {

              if (resp.deleted) {
                this.setState({errorMessage: "Receta eliminada de favoritas!"});
                setTimeout(function(){
                    this.setState({errorMessage: ""});
                }.bind(this),2000);
              }
              else{
                this.setState({errorMessage: "Receta añadida a favoritas!"});
                setTimeout(function(){
                    this.setState({errorMessage: ""});
                }.bind(this),2000);
              }
            });
        this.props.update()
    }
    ratingPublicacion = async (rating) =>{
        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        await fetch(`/rate?id_receta=${this.props.idReceta}&id_usuario=${user}&rating=${rating}`)
         .then(res => {
            return res.json()
          })
            .then(resp => {

              if (resp.deleted) {
                this.setState({errorMessage: "Calificación actualizada!"});
                setTimeout(function(){
                    this.setState({errorMessage: ""});
                }.bind(this),2000);
              }
              else{
                this.setState({errorMessage: "Calificación añadida!"});
                setTimeout(function(){
                    this.setState({errorMessage: ""});
                }.bind(this),2000);
              }
            });
        this.props.update()
    }
    renderIngrediente = ({nombre, precio, cantidad},i) => <li key={i}>{nombre} x {cantidad}</li>
    renderRating = () => {
        let rating = []
        //temporal
        let ratingNumber = Math.ceil(this.props.rating);
        // Create filled maruchan
        for(let i = 0; i < ratingNumber ; i++) {
            rating.push(<img onClick={() => this.ratingPublicacion(i+1)} key={i} src={logoEF} className="iconos" alt="El Foráneo" />);
        }
        // Create unfilled maruchan
        for(let i = ratingNumber ; i < 5; i++) {
            rating.push(<img onClick={() => this.ratingPublicacion(i+1)} key={i} src={logoBN} className="iconos" alt="El Foráneo" />);
        }
        return rating
    }
    renderImage = () =>{
        return <img src={this.props.imagen} className="TamanoFoto" alt="El Foráneo" onClick={this.cargarInformacion} />
    }
    render() {
        return (
            <div className="CuadroRecetas">
                <h3>
                    {this.state.errorMessage}
                </h3>
                <div className="HeadReceta">
                    <div className="Info">
                        <img src={logoUsuario} className="iconos" alt="Notificaciones" />
                        <div className="tiempo" >
                            <label id="NombreUsuarioReceta"> {this.props.usuario}  </label>
                            <label id="TiempoReceta"> {this.props.tiempo} min - {this.props.categoria} </label>
                        </div>
                    </div>
                    <div className="barraIconosReceta">
                        <img src={logoNotificaciones} onClick={this.likePublicacion} className="iconos" alt="Notificaciones" />
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
