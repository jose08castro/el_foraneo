import React from 'react';
import logo from './logo.svg';
import logoBN from './images/logoBN.png';
import logoEF from './images/logo.png';
import logoExplorar from './images/explore.png';
import logoNotificaciones from './images/favorite.png';
import logoUsuario from './images/person.png';
import logoNuevaReceta from './images/nuevaReceta.png';
import Cookies from 'universal-cookie';

import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown'

import Publicacion from './publicacion.js';
import Barra from './barra.js';
import PlanAlimenticio from './planAlimenticio.js';


import './principal.css';


import ReactSearchBox from 'react-search-box';
// Esta funcion se supone que le da el estilo al Toggle del Dropdown

const CustomToggle1 = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
        className="DropFiltro"
    >
        {children}
        &#x25bc;
    </a>
));


class Principal extends React.Component {
    constructor(props) {
	    super(props)
		this.state = {
            userId : 0,
            recetas : [],
            favoritas : [],
            categorias : [],
            notificaciones: []
        };
	}
    async componentDidMount(){
        let resp = await fetch('/recetas');
        let recetas = await resp.json();
        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        console.log(user);
        resp = await fetch('/categorias');
        let categorias = await resp.json();
        resp = await fetch(`/favoritas/${encodeURIComponent(user)}`);
        let favoritas = await resp.json();
        resp = await fetch(`/notificaciones/${encodeURIComponent(user)}`);
        let notificaciones = await resp.json();
        this.setState({
            userId: user,
            recetas : recetas.recetas,
            favoritas :  favoritas.recetas,
            categorias: categorias.categorias,
            notificaciones: notificaciones.notificaciones
        });
      }
    renderCategoria = ({id, nombre}) => <Dropdown.Item key={id}>{nombre}</Dropdown.Item>
    renderFavorita = ({id, nombre},i) => <li key={id}>{nombre}</li>
    renderReceta = ({id,nombre,pasos,tiempo,imagen,categoria,usuario,rating,ingredientes,precio}) =>
    <Publicacion 
    key = {id}
    idReceta={id} 
    nombre={nombre} 
    pasos={pasos} 
    tiempo={tiempo} 
    imagen={imagen}
    categoria={categoria} 
    usuario={usuario}
     rating={rating} 
     ingredientes={ingredientes} 
     precio={precio} />;
     

    generarPlan() {
        ReactDOM.render(<PlanAlimenticio />, document.getElementById('root'));
    }

    render() {
        const { userId, recetas, favoritas, categorias, notificaciones} = this.state;
        return (
            <div className="App">
                <Barra />
                <div className="App-contenido">
                    <div className="Muro">

                        <div className="CuadroFiltros">
                            <div className="SuperiorFiltros">
                                <label className="Subtitulo">Filtros</label>
                                <button className="ButonGenerar" onClick={this.generarPlan}> Generar Plan </button>
                            </div>
                            <div className="InteriorCuadroFiltros">
                                <link
                                    rel="stylesheet"
                                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                                    crossOrigin="anonymous"
                                />
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle1}>Organizar</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Action</Dropdown.Item>
                                        <Dropdown.Item >Another action</Dropdown.Item>
                                        <Dropdown.Item >Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle1}>Categoria</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {categorias.map(this.renderCategoria)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle1}>Rango de Precios</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Puto</Dropdown.Item>
                                        <Dropdown.Item >Tapia</Dropdown.Item>
                                        <Dropdown.Item >Playo</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        {recetas.map(this.renderReceta)}

                    </div>
                    <div className="Favoritos">

                        <div className="HeaderFavoritos">
                            Mis Recetas Favoritas
                        </div>
                        <div className="RecetasFavoritas">
                            <ul>
                                {favoritas.map(this.renderFavorita)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div >


        );
    }


}
export default Principal;
