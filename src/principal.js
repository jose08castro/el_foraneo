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
            userId: 0,
            recetas: [],
            favoritas: [],
            categorias: [],
            notificaciones: [],
            categoria: 0,
            precios: 0,
            organizar: 0
        };
    }
    async componentDidMount() {
        let resp = await fetch('/recetas');
        let recetas = await resp.json();
        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        resp = await fetch('/categorias');
        let categorias = await resp.json();
        resp = await fetch(`/favoritas/${encodeURIComponent(user)}`);
        let favoritas = await resp.json();
        resp = await fetch(`/notificaciones/${encodeURIComponent(user)}`);
        let notificaciones = await resp.json();
        this.setState({
            userId: user,
            recetas: recetas.recetas,
            favoritas: favoritas.recetas,
            categorias: categorias.categorias,
            notificaciones: notificaciones.notificaciones
        });
    }
    renderCategoria = ({ id, nombre }) => <option key={id} value={id}>{nombre}</option>
    renderFavorita = ({ id, nombre }, i) => <li key={id}>{nombre}</li>
    renderReceta = ({ id, nombre, pasos, tiempo, imagen, categoria, usuario, rating, ingredientes, precio }) =>
        <Publicacion
            key={id}
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


    generarPlan = () => {
        ReactDOM.render(<PlanAlimenticio recetas={this.state.recetas} categorias={this.state.categorias} notificaciones={this.state.notificaciones} />, document.getElementById('root'));
    }

    render() {
        const { userId, recetas, favoritas, categorias, notificaciones } = this.state;

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
                                <select className="DropFiltroPlan" value={this.state.organizar} onChange={(e) => { this.setState({ organizar: e.target.value }) }}>
                                    <option disabled hidden key={0} value={0}>Organizar</option>
                                    {[{ id: 1, nombre: "Más antiguos" }, { id: 2, nombre: "Más recientes" }, { id: 3, nombre: "Mejor calificadas" }].map(this.renderCategoria)}
                                </select>
                                <select className="DropFiltroPlan" value={this.state.categoria} onChange={(e) => { this.setState({ categoria: e.target.value }) }}>
                                    <option disabled hidden key={0} value={0}>Categoría</option>
                                    {categorias.map(this.renderCategoria)}
                                </select>
                                <select className="DropFiltroPlan" value={this.state.precios} onChange={(e) => { this.setState({ precios: e.target.value }) }}>
                                    <option disabled hidden key={0} value={0}>Rango de Precios</option>
                                    {[{ id: 1, nombre: "0-1000" }, { id: 2, nombre: "1000-2000" }, { id: 3, nombre: "2000-3000" }, { id: 4, nombre: "3000+" }].map(this.renderCategoria)}
                                </select>
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
