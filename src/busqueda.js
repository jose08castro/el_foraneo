import React from 'react';
import chifrijo from './images/chifrijo.png';

import Barra from './barra.js';

import './busqueda.css';

import Dropdown from 'react-bootstrap/Dropdown'


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

// import ReactSearchBox from 'react-search-box';

class Busqueda extends React.Component {
    render() {
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
                                        <Dropdown.Item >Action</Dropdown.Item>
                                        <Dropdown.Item >Another action</Dropdown.Item>
                                        <Dropdown.Item >Something else</Dropdown.Item>
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
                        <div className="Bcentrado">
                            <div className="row Bdistancia">
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                            </div>
                            <div className="row Bdistancia">
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                            </div>
                            <div className="row Bdistancia">
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div className="Bresultado"><img src={chifrijo} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Busqueda;
