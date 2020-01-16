import React from 'react';
import ReactDOM from 'react-dom';
import logoEF from './images/logo.png';
import logoExplorar from './images/explore.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoNuevaReceta from './images/nuevaReceta.png';
import Principal from './principal.js';

import './principal.css';


import ReactSearchBox from 'react-search-box';

class Barra extends React.Component {
    cargarPrincipal = () =>{
        ReactDOM.render(<Principal />, document.getElementById('root'));
    }
    render() {
        return (
            <div className="BarraPrincipal">
                <div className="BarraInicio">
                    <img src={logoEF} className="ElForaneoP" alt="El Foráneo" onClick={this.cargarPrincipal} />
                    <h1 className="Titulo">El Foráneo</h1>
                </div>
                <div className="BarraBusqueda" >
                    <ReactSearchBox
                        placeholder="Buscar"
                        inputBoxFontColor="red"
                        onFocus={() => {
                            console.log('This function is called when is focussed')
                        }}
                    />
                </div>
                <div className="barraIconos">
                    <img src={logoExplorar} className="iconos" alt="Explorar" onClick={this.cargarPrincipal}/>
                    <img src={logoNotificaciones} className="iconos" alt="Notificaciones" />
                    <img src={logoNuevaReceta} className="iconos" alt="Nueva Receta" />
                    <img src={logoUsuario} className="iconos" alt="Mi perfil" />
                </div>
            </div>
        );
    }


}
export default Barra;
