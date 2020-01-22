import React from 'react';
import Cookies from 'universal-cookie';


import Publicacion from './publicacion.js';
import Barra from './barra.js';
import ReactDOM from 'react-dom';
import PlanAlimenticio from './planAlimenticio.js';

import './principal.css';

class Perfil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {nombre:"", apellidos:"",usuario:""},
            recetas: [],
            categorias: [],
            categoria: "0",
            precios: "0",
            tiempo: "0"
        };
        document.body.style = 'background: #faeeae;';
    }

    updateValues = async() =>{

        const cookie = new Cookies();
        let user = cookie.get('USER').id;
        let resp = await fetch(`/usuario/${encodeURIComponent(user)}`);
        let userInfo = await resp.json();
        resp = await fetch('/categorias');
        let categorias = await resp.json();
        resp = await fetch(`/todas/${encodeURIComponent(user)}`);
        let recetas = await resp.json();

        this.setState({
            userInfo: userInfo.userInfo[0],
            recetas: recetas.recetas,
            categorias: categorias.categorias,
        });
    }

    async componentDidMount() {
        await this.updateValues();
    }

    generarPlan = () => {
        ReactDOM.render(<PlanAlimenticio recetas={this.state.recetas} categorias={this.state.categorias} notificaciones={this.state.notificaciones} />, document.getElementById('root'));
    }

    renderCategoria = ({ id, nombre }) => <option key={id} value={nombre}>{nombre}</option>
    renderFiltro= ({ id, nombre }) => <option key={id} value={id}>{nombre}</option>
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
    render() {
        const { userInfo,recetas, categorias } = this.state;
        return (
            <div className="App">
                <Barra />
                <div className="App-contenido">
                    <div className="Muro">
                        <div className="Nombreperfil">
                            <div className="Parriba"><p className="PdistanciaMargin">{userInfo.nombre + " " + userInfo.apellidos}</p></div>
                            <div className="PdistanciaMargin"><p>{userInfo.usuario}</p></div>
                        </div>
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
                </div>
            </div >


        );
    }


}
export default Perfil;
