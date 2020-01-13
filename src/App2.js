import React from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App.js';
import ReactDOM from 'react-dom';

class App2 extends React.Component {
  iniciarSesion() {
    ReactDOM.render(<App />, document.getElementById('root'));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            App2 <code>src/App.js</code> Holi.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hola Casa
        </a>
        </header>
        <button className="Boton" onClick={this.iniciarSesion}>Iniciar Sesión</button>
      </div>
    );
  }
}

export default App2;
