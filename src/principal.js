import React from 'react';
import Cookies from 'universal-cookie';

import ReactDOM from 'react-dom';

import Publicacion from './publicacion.js';
import Barra from './barra.js';
import PlanAlimenticio from './planAlimenticio.js';
import InfoReceta from './infoReceta.js';


import './principal.css';


// Esta funcion se supone que le da el estilo al Toggle del Dropdown

class Principal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: 0,
            recetas: [],
            favoritas: [],
            categorias: [],
            categoria: "0",
            precios: "0",
            tiempo: "0",
            errorMessage: ""
        };
    }
    updateValues = async() =>{
        let resp = await fetch('/recetas');
        let recetas = await resp.json();
        this.setState({
            recetas: recetas.recetas
        });
        const cookie = new Cookies();
        let user = cookie.get('USER').id;
         resp = await fetch('/categorias');
        let categorias = await resp.json();
        resp = await fetch(`/favoritas/${encodeURIComponent(user)}`);
        let favoritas = await resp.json();
        
        this.setState({
            userId: user,
            favoritas: favoritas.recetas,
            categorias: categorias.categorias,
        });
    }
    async componentDidMount() {
        this.updateValues();
    }
    desplegarFavorito= (id) =>{
        let i = 0;
        while(i < this.state.recetas.length){
            if(this.state.recetas[i].id === id){
                ReactDOM.render(this.renderDetalles(this.state.recetas[i]), document.getElementById('root'));
                break;
            }
            i++;
        }
    }
    renderCategoria = ({ id, nombre }) => <option key={id} value={nombre}>{nombre}</option>
    renderFiltro= ({ id, nombre }) => <option key={id} value={id}>{nombre}</option>

    renderFavorita = ({ id, nombre }, i) => <li onClick={() => this.desplegarFavorito(id)} key={id}>{nombre}</li>
    renderDetalles = ({id, nombre, pasos, tiempo, imagen, categoria, usuario, rating, ingredientes, precio}) =>
        <InfoReceta
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
         precio={precio}/>
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
            precio={precio}
            update={this.updateValues} />;


    generarPlan = () => {
        ReactDOM.render(<PlanAlimenticio recetas={this.state.recetas} categorias={this.state.categorias} notificaciones={this.state.notificaciones} />, document.getElementById('root'));
    }

    render() {
        const { userId, recetas, favoritas, categorias} = this.state;

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
                                <select className="DropFiltroPlan" value={this.state.tiempo} onChange={(e) => { this.setState({ tiempo: e.target.value }) }}>
                                    <option key={0} value={"0"}>Tiempo</option>
                                    {[{ id: 1, nombre: "0-30 min" }, { id: 2, nombre: "30-60 min" }, { id: 3, nombre: "60+ min" }].map(this.renderFiltro)}
                                </select>
                                <select className="DropFiltroPlan" value={this.state.categoria} onChange={(e) => { this.setState({ categoria: e.target.value }) }}>
                                    <option key={0} value={"0"}>Categoría</option>
                                    {categorias.map(this.renderCategoria)}
                                </select>
                                <select className="DropFiltroPlan" value={this.state.precios} onChange={(e) => { this.setState({ precios: e.target.value }) }}>
                                    <option key={0} value={"0"}>Rango de Precios</option>
                                    {[{ id: 1, nombre: "0-1000" }, { id: 2, nombre: "1000-2000" }, { id: 3, nombre: "2000-3000" }, { id: 4, nombre: "3000+" }].map(this.renderFiltro)}
                                </select>
                            </div>
                        </div>
                        {recetas.filter(item => ((this.state.categoria === "0" || item.categoria === this.state.categoria) && 
                        ((this.state.precios === "0") || 
                        ((this.state.precios === "1" && item.precio <= 1000) || 
                        (this.state.precios === "2" && (item.precio >= 1000 && item.precio <= 2000)) || 
                        (this.state.precios === "3" && (item.precio >= 2000 && item.precio < 3000))||
                        (this.state.precios === "4" && item.precio >= 3000))) &&
                        ((this.state.tiempo === "0")||
                        (this.state.tiempo === "1" && item.tiempo <= 30) ||
                        (this.state.tiempo === "2" && (item.tiempo >= 30 && item.tiempo <= 60))||
                        (this.state.tiempo === "3" && item.tiempo >= 60)))).map(this.renderReceta)}

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
