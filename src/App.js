
import React from 'react';
import logoEF from './images/logo.png';
import './App.css';
import Principal from './principal.js';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
class App extends React.Component {
  constructor() {
    super();
    const cookie = new Cookies();
    if(cookie.get('USER')){
      ReactDOM.render(<Principal />, document.getElementById('root'));
    }
      this.iniciarSesion = this.iniciarSesion.bind(this);
      this.registrarUsuario = this.registrarUsuario.bind(this);
      this.state = { displayErrors:false, displayErrorsR:false,errorMessage:"",errorMessageR:""};
  }

  async iniciarSesion(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      // form is invalid! so we do nothing
      this.setState({ displayErrors: true, displayErrorsR: false,errorMessage:"Por favor revisar los valores insertados",errorMessageR:""});
      return;
    }
    this.state = { displayErrors:false, displayErrorsR:false,errorMessage:"",errorMessageR:""};

    // form is valid! We can parse and submit data
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);
    await fetch('/login', {
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
          cookie.set('USER', { logged: true, id: resp.id }, { path: '/' });
          console.log(cookie.get('USER'));
          ReactDOM.render(<Principal />, document.getElementById('root'));
        }
        else{
          this.setState({ displayErrors: false, displayErrorsR: false,errorMessage:"Usuario o contraseña invalidos",errorMessageR:""});
        }
      });

  }


  async registrarUsuario(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      // form is invalid! so we do nothing
      this.setState({ displayErrors: false, displayErrorsR: true});
      this.setState({ displayErrors: false, displayErrorsR: true,errorMessage:"",errorMessageR:"Por favor revisar los valores insertados"});

      return;
    }
    this.setState({ displayErrors: false, displayErrorsR: false});
    // form is valid! We can parse and submit data
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);

    await fetch('/user/register', {
      method: 'POST',
      body: data,
    }).then(res => {
      console.log(res);
      return res.json()
    })
      .then(resp => {
        if (resp.result) {
          const cookie = new Cookies();
          cookie.set('USER', { logged: true, id: resp.id }, { path: '/' });
          console.log(cookie.get('USER'));
          ReactDOM.render(<Principal />, document.getElementById('root'));
        }
        else{
          this.setState({ displayErrors: false, displayErrorsR: false,errorMessage:"",errorMessageR:"Usuario existente, seleccione un nuevo usuario"});
        }
      });


  }

  render() {
    const { displayErrors,displayErrorsR,errorMessage,errorMessageR } = this.state;

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
              <form noValidate onSubmit={this.iniciarSesion} className={displayErrors ? 'displayErrors' : ''}>
                <input className="Campo" type="text" name="usuario" id="inputUserR" placeholder="Username" pattern="^[a-zA-Z0-9_]{1,}$" required></input>
                <br />
                <input className="Campo" type="password" name="password" id="inputPassR" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required></input>
                <br />
                <button className="Boton">Iniciar Sesión</button>
              </form>
            </div>
            <h3 className="ErrorMessage">{errorMessage}</h3>
          </div>
          <div className="CuadroReg">
            <div className="Superior">
              <label className="Subtitulo Subletra">Crea una cuenta</label>
            </div>
            <div className="InteriorCuadro2">
              <form noValidate onSubmit={this.registrarUsuario} className={displayErrorsR ? 'displayErrors' : ''}>
                <input className="Campo" type="text" name="nombre" id="inputNombre" placeholder="Nombre" pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]{1,}$" required></input>
                <br />
                <input className="Campo" type="text" name="apellidos" id="inputApellido" placeholder="Apellidos" pattern="^[A-Za-zÀ-ÖØ-öø-ÿ ]{1,}$" required></input>
                <br />
                <input className="Campo" type="email" name="correo" id="inputEmail" placeholder="Correo" required></input>
                <br />
                <input className="Campo" type="text" name="usuarioR" id="inputUser" placeholder="Username" pattern="^[a-zA-Z0-9_]{1,}$" required></input>
                <br />
                <input className="Campo" type="password" name="passwordR" id="inputPass" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required></input>
                <br />
                <button className="Boton">Regístrate</button>
              </form>
            </div>
            <h3 className="ErrorMessage">{errorMessageR}</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
