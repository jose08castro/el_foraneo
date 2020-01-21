import React from 'react';
import InfoReceta from './infoReceta.js';
import ReactDOM from 'react-dom';

import Barra from './barra.js';

import './busqueda.css';
class Busqueda extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recetas: [],
            categorias: [],
            categoria: "0",
            precios: "0",
            tiempo: "0"
        };
        document.body.style = 'background: #faeeae;';
    }
    renderCategoria = ({ id, nombre }) => <option key={id} value={nombre}>{nombre}</option>

    renderFiltro = ({ id, nombre }) => <option key={id} value={id}>{nombre}</option>

    updateValues = async () => {
        let resp = await fetch(`/recetas?search=${encodeURIComponent(this.props.search)}`);
        let recetas = await resp.json();
        resp = await fetch('/categorias');
        let categorias = await resp.json();
        this.setState({
            categorias: categorias.categorias,
            recetas: recetas.recetas
        });
    }
    async componentDidMount() {
        this.updateValues();
    }

    renderDetalles = ({ id, nombre, pasos, tiempo, imagen, categoria, usuario, rating, ingredientes, precio }) => {
        let info = <InfoReceta
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
            precio={precio} />
        ReactDOM.render(info, document.getElementById('root'));
    }
    renderReceta = () => {

        let iterar = this.state.recetas.filter(item =>
            ((this.state.categoria === "0" || item.categoria === this.state.categoria) &&
                ((this.state.precios === "0") ||
                    ((this.state.precios === "1" && item.precio <= 1000) ||
                        (this.state.precios === "2" && (item.precio >= 1000 && item.precio <= 2000)) ||
                        (this.state.precios === "3" && (item.precio >= 2000 && item.precio < 3000)) ||
                        (this.state.precios === "4" && item.precio >= 3000))) &&
                ((this.state.tiempo === "0") ||
                    (this.state.tiempo === "1" && item.tiempo <= 30) ||
                    (this.state.tiempo === "2" && (item.tiempo >= 30 && item.tiempo <= 60)) ||
                    (this.state.tiempo === "3" && item.tiempo >= 60))));
        let recetas = [];
        let currentRecetas = [];
        let i = 0;
        for (i; i < iterar.length; i++) {
            let receta = iterar[i];
            if (i > 0 && i % 4 === 0) {
                recetas.push(<div className="row Bdistancia"> {currentRecetas} </div>)
                currentRecetas = [];
            }
            currentRecetas.push(<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3"><div className="Bresultado"><img alt="receta" src={receta.imagen} onClick={() => this.renderDetalles(receta)} /></div></div>)
        }
        if (currentRecetas.length >= 1) {
            recetas.push(<div className="row Bdistancia"> {currentRecetas} </div>)
            currentRecetas = [];
        }
        return recetas
    }
    render() {
        const { recetas, categorias } = this.state;
        return (
            <div>
                <Barra />
                <div className="App-contenido">
                    <div className="Muro">
                        <div className="CuadroFiltros">
                            <div className="SuperiorFiltros">
                                <label className="Subtitulo">Filtros</label>
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
                        <div className="Bcentrado">
                            {this.renderReceta()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Busqueda;
