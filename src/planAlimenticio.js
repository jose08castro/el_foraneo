import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

import Barra from './barra.js';
import Categoria from './categoria.js';

import './planAlimenticio.css';


class PlanAlimenticio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            despliegue: [],
            categoria: 0,
            precios: 0,
            cantidad: 0,
            errorMessage: ""
        };
    }
    renderCategoriaToggle = ({ id, nombre }) => <Dropdown.Item key={id}>{nombre}</Dropdown.Item>
    renderPlan = <Categoria recetas={this.props.recetas} />
    renderCategoria = ({ id, nombre }) => <option key={id} value={id}>{nombre}</option>
    generar = async () => {
        let nombrecat = "",min = -1, max = -1, id_categoria=this.state.categoria, cantidad=this.state.cantidad;
        switch (parseInt(this.state.precios)) {
            case 1:
                min = 0;
                max = 1000;
                break;
            case 2:
                min = 1000;
                max = 2000;
                break;
            case 3:
                min = 2000;
                max = 3000;
                break;
            case 4:
                min = 3000;
                max = 9999999;
                break;
            default:
                break;
        }
        if(min > -1 && max > -1 && parseInt(cantidad) > 0 &&  id_categoria > 0){
            let resp = await fetch(`/plan?min=${min}&max=${max}&cantidad=${cantidad}&id_categoria=${id_categoria}`);
            let resultados = await resp.json();
            if(resultados.result && resultados.recetas.recetas.length>0){
                this.setState({errorMessage: ""});
                for(let i = 0; i < this.props.categorias.length; i++){
                    if (parseInt(this.props.categorias[i].id) === parseInt(id_categoria)){
                        nombrecat = this.props.categorias[i].nombre;
                    }
                }
                this.setState({ despliegue: [<Categoria categoria={nombrecat} key={1} recetas={resultados.recetas.recetas} />] })

            } else {
                this.setState({errorMessage: "No se encontraron planes de comida con los parámetros insertados :("});
            }
        
        }
        else{
            this.setState({errorMessage: "Por favor llene todos los campos solicitados correctamente."});
        }
    }
    render() {
        var despliegue = this.state.despliegue;
        return (
            <div className="App">
                <Barra />
                <div className="FondoPlan">
                    <div className="CuadroFiltrosPlan">
                        <div className="SuperiorFiltrosPlan">
                            <label className="SubtituloFiltro">Generación de plan de comidas</label>
                        </div>
                        <div className="ContenedorFiltros">
                            <div className="InteriorFiltrosPlan">
                                <div className="CampoFiltro">
                                    <p className="DescripcionFiltro">¿Qué desea comer?</p>
                                    <select className="DropFiltroPlan" value={this.state.categoria} onChange={(e) => { this.setState({ categoria: e.target.value }) }}>
                                        <option disabled hidden key={0} value={0}>Categoría</option>
                                        {this.props.categorias.map(this.renderCategoria)}
                                    </select>
                                </div>
                                <div className="CampoFiltro">
                                    <p className="DescripcionFiltro">¿A qué precio?</p>
                                    <select className="DropFiltroPlan" value={this.state.precios} onChange={(e) => { this.setState({ precios: e.target.value }) }}>
                                        <option disabled hidden key={0} value={0}>Rango de Precios</option>
                                        {[{ id: 1, nombre: "0-1000" }, { id: 2, nombre: "1000-2000" }, { id: 3, nombre: "2000-3000" }, { id: 4, nombre: "3000+" }].map(this.renderCategoria)}
                                    </select>
                                </div>
                                <div className="CampoFiltro">
                                    <p>¿En cuántas comidas?</p>
                                    <input onChange={eve => {this.setState({cantidad:eve.target.value})}} value={this.state.cantidad} className="CampoCant" type="number" id="cantidad" placeholder="Cantidad" required></input>
                                </div>
                            </div>
                            <button className="BotonGenerar" onClick={this.generar}>Generar</button>
                        </div>
                    </div>
                    <div className="DetallesComidas">
                        {despliegue}
                    </div>
                    <h2>{this.state.errorMessage}</h2>
                </div>
            </div >
        );
    }


}
export default PlanAlimenticio;
