
import React from 'react';
import logoEF from './images/logo.png';
import './App.css';
import Principal from './principal.js';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
class App extends React.Component {
  constructor() {
    super();
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.registrarUsuario = this.registrarUsuario.bind(this);
  }

  async iniciarSesion(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);
    await fetch('/api/login', {
      method: 'POST',
      body: data
    }).then(res => {
      console.log(res);
      return res.json()
    })
      .then(resp => {
        console.log(resp);
        if (resp.result) {
          const cookie = new Cookies();
          cookie.set('USER', { logged: true, id: resp }, { path: '/' });
          console.log(cookie.get('USER'));
          ReactDOM.render(<Principal />, document.getElementById('root'));
        }
      });

  }


  async registrarUsuario(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);

    await fetch('/api/user/register', {
      method: 'POST',
      body: data,
    }).then(res => {
      console.log(res);
      return res.json()
    })
      .then(resp => {
        if (resp.result) {
          const cookie = new Cookies();
          cookie.set('USER', { logged: true, id: resp }, { path: '/' });
          console.log(cookie.get('USER'));
          ReactDOM.render(<Principal />, document.getElementById('root'));
        }
      });


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
              <form onSubmit={this.iniciarSesion}>
                <input className="Campo" type="text" name="usuario" id="inputUserR" placeholder="Username" required></input>
                <br />
                <input className="Campo" type="text" name="password" id="inputPassR" placeholder="Password" required></input>
                <br />
                <button className="Boton">Iniciar Sesión</button>
              </form>
            </div>
          </div>
          <div className="CuadroReg">
            <div className="Superior">
              <label className="Subtitulo Subletra">Crea una cuenta</label>
            </div>
            <div className="InteriorCuadro2">
              <form onSubmit={this.registrarUsuario}>
                <input className="Campo" type="text" name="nombre" id="inputNombre" placeholder="Nombre" required></input>
                <br />
                <input className="Campo" type="text" name="apellidos" id="inputApellido" placeholder="Apellidos" required></input>
                <br />
                <input className="Campo" type="text" name="correo" id="inputEmail" placeholder="Correo" required></input>
                <br />
                <input className="Campo" type="text" name="usuarioR" id="inputUser" placeholder="Username" required></input>
                <br />
                <input className="Campo" type="text" name="passwordR" id="inputPass" placeholder="Password" required></input>
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
