import React, { Component } from 'react'

import './tabla.css';

class Tabla extends React.Component {
    constructor(props) {
        super(props);
        //  this.state.ingredientes = [];
        this.state = {};
        this.state.filterText = "";
        this.state.ingredientes = [
            {
                id: 1,
                nombre: 'Salsa',
                precio: 2000,
                cantidad: 12,

            }, {
                id: 2,
                nombre: 'Tomate',
                precio: '2000',
                cantidad: 15,

            }
        ];
    }

    handleRowDel(ingrediente) {
        var index = this.state.ingredientes.indexOf(ingrediente);
        this.state.ingredientes.splice(index, 1);
        this.setState(this.state.ingredientes);
    };

    handleAddEvent(evt) {
        var id = 1;
        var ingrediente = {
            id: id,
            nombre: "",
            precio: "",
            cantidad: 0
        }
        this.state.ingredientes.push(ingrediente);
        this.setState(this.state.ingredientes);
    }

    handleIngredienteTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var ingredientes = this.state.ingredientes.slice();
        var nuevoingredientes = ingredientes.map(function (ingrediente) {

            for (var key in ingrediente) {
                if (key == item.name && ingrediente.id == item.id) {
                    ingrediente[key] = item.value;

                }
            }
            return ingrediente;
        });
        this.setState({ ingredientes: nuevoingredientes });
        //  console.log(this.state.ingredientes);
    };

    render() {
        return (
            <div className="Ttabla">
                <IngredienteTable
                    onIngredienteTableUpdate={this.handleIngredienteTable.bind(this)}
                    onRowAdd={this.handleAddEvent.bind(this)}
                    onRowDel={this.handleRowDel.bind(this)}
                    ingredientes={this.state.ingredientes}
                    filterText={this.state.filterText} />
            </div>
        );
    }
}

class IngredienteTable extends React.Component {
    render() {
        var onIngredienteTableUpdate = this.props.onIngredienteTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;
        var ingrediente = this.props.ingredientes.map(function (ingrediente) {
            if (ingrediente.nombre.indexOf(filterText) === -1) {
                return;
            }
            return (
                <IngredienteRow
                    onIngredienteTableUpdate={onIngredienteTableUpdate}
                    ingrediente={ingrediente}
                    onDelEvent={rowDel.bind(this)}
                    key={ingrediente.id}
                />
            )
        });
        return (
                <div className="TmodTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody >
                            {ingrediente}
                        </tbody>
                    </table>
                    <button className="TbotonMas" type="button" onClick={this.props.onRowAdd}>+</button>
                </div>
        );
    }
}

class IngredienteRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.ingrediente);
    }

    render() {
        return (
            <tr className="">
                <EditableCell onIngredienteTableUpdate={this.props.onIngredienteTableUpdate}
                    cellData={{
                        type: "nombre",
                        value: this.props.ingrediente.nombre,
                        id: this.props.ingrediente.id
                    }} />
                <EditableCell onIngredienteTableUpdate={this.props.onIngredienteTableUpdate}
                    cellData={{
                        type: "precio",
                        value: this.props.ingrediente.precio,
                        id: this.props.ingrediente.id
                    }} />
                <EditableCell onIngredienteTableUpdate={this.props.onIngredienteTableUpdate}
                    cellData={{
                        type: "cantidad",
                        value: this.props.ingrediente.cantidad,
                        id: this.props.ingrediente.id
                    }} />
                <td className="">
                    <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="" />
                </td>
            </tr>
        );
    }
}

class EditableCell extends React.Component {
    render() {
        return (
            <td>
                <input className="Tinput" type='text'
                    name={this.props.cellData.type}
                    id={this.props.cellData.id}
                    value={this.props.cellData.value}
                    onChange={this.props.onIngredienteTableUpdate}
                />
            </td>
        );
    }
}

export default Tabla;