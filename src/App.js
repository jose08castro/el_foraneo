import React, { Component } from 'react';
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

class App extends Component{

  constructor(props) {
		super(props)
		this.state = {
      usuarios : [],
      usuario : '',
      password : ''
    };
	}

  async componentDidMount(){
    let resp = await fetch('/api/usuarios');
    let usuarios = await resp.json();
    this.setState({usuarios : usuarios.usuarios})
  }

  renderUsuario = ({usuario, nombre, apellidos}) => <div key = {usuario}>{nombre} {apellidos}</div>

  changeHandler = (e) => {
    this.setState({[e.target.name]:[e.target.value]})
  }



  render(){
    const { usuarios, usuario, password} = this.state;
    return(
      <div className="App">
        {usuarios.map(this.renderUsuario)} 
        <div>
        <form method="POST" action="/api/login">
          <div>
            <input type='text' name='usuario' value={usuario} onChange={this.changeHandler}/>
          </div>
          <div>
            <input type='password' name='password' value={password} onChange={this.changeHandler}/>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
      </div>
    )
  }
  

}
export default App;
