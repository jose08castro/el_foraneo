import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

import Barra from './barra.js';
import Categoria from './categoria.js';

import './planAlimenticio.css';

const CustomToggle1 = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
        className="DropFiltroPlan"
    >
        {children}
        &#x25bc;
    </a>
));

class PlanAlimenticio extends React.Component {
    render() {
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
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle1}>Categoria</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item >Action</Dropdown.Item>
                                            <Dropdown.Item >Another action</Dropdown.Item>
                                            <Dropdown.Item >Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="CampoFiltro">
                                    <p className="DescripcionFiltro">¿A qué precio?</p>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle1}>Rango de Precios</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item >Action</Dropdown.Item>
                                            <Dropdown.Item >Another action</Dropdown.Item>
                                            <Dropdown.Item >Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="CampoFiltro">
                                    <p>¿En cuántas comidas?</p>
                                    <input className="CampoCant" type="number" id="cantidad" placeholder="Cantidad" required></input>
                                </div>
                            </div>
                            <button className="BotonGenerar" onClick={this.iniciarSesion}>Generar</button>
                        </div>
                    </div>
                    <Categoria />
                    <Categoria />
                    <Categoria />
                    <div className="CuadroResumen">
                        <div className="SuperiorFiltrosPlan">
                            <label className="SubtituloFiltro">Resumen del plan</label>
                        </div>
                        <div className="ContenedorResumen">
                            <div className="InteriorResumen">
                                <div className="CuadroDatos">
                                    <p className="PrecioResumen">Costo total: ₡10.500</p>
                                    <table>
                                        <tr>
                                            <td>Desayunos</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>Almuerzos</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>Cenas</td>
                                            <td>2</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="CuadroDatos">
                                    <p className="PrecioResumen">Ingredientes</p>
                                    <table>
                                        <tr>
                                            <td>x2</td>
                                            <td>Huevos</td>
                                        </tr>
                                        <tr>
                                            <td>x3</td>
                                            <td>Fideos</td>
                                        </tr>
                                        <tr>
                                            <td>x5</td>
                                            <td>Cebolla</td>
                                        </tr>
                                        <tr>
                                            <td>x1</td>
                                            <td>Lechuga</td>
                                        </tr>
                                        <tr>
                                            <td>x2</td>
                                            <td>Salsa Lizano</td>
                                        </tr>
                                        <tr>
                                            <td>x6</td>
                                            <td>Tomate</td>
                                        </tr>
                                        <tr>
                                            <td>x1</td>
                                            <td>Cereal</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }


}
export default PlanAlimenticio;
