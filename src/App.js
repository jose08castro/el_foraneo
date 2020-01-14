
import React from 'react';
import logoEF from './images/logo.png';
import './App.css';
import Principal from './principal.js';
import ReactDOM from 'react-dom';

class App extends React.Component {
  iniciarSesion() {
    ReactDOM.render(<Principal />, document.getElementById('root'));
  }

  render() {
    return (
      <div id="App" className="App">
        <div className="Barra">
          <img src={logoEF} className="ElForaneo" alt="El Foráneo" />
          <h1>El Foráneo</h1>
        </div>
        <div className="App-header">
          <div className="CuadroUsu">
            <div className="Superior">
              <label className="Subtitulo">Inicio de Sesión</label>
            </div>
            <div className="InteriorCuadro">
              <form>
                <input className="Campo" type="text" id="inputUserR" placeholder="Username" required></input>
                <br />
                <input className="Campo" type="text" id="inputPassR" placeholder="Password" required></input>
                <br />
                <button className="Boton" onClick={this.iniciarSesion}>Iniciar Sesión</button>
              </form>
            </div>
          </div>
          <div className="CuadroReg">
            <div className="Superior">
              <label className="Subtitulo Subletra">Crea una cuenta</label>
            </div>
            <div className="InteriorCuadro2">
              <form>
                <input className="Campo" type="text" id="inputNombre" placeholder="Nombre" required></input>
                <br />
                <input className="Campo" type="text" id="inputApellido" placeholder="Apellidos" required></input>
                <br />
                <input className="Campo" type="text" id="inputEmail" placeholder="Correo" required></input>
                <br />
                <input className="Campo" type="text" id="inputUser" placeholder="Username" required></input>
                <br />
                <input className="Campo" type="text" id="inputPass" placeholder="Password" required></input>
                <br />
                <button className="Boton">Regístrate</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
