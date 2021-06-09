import { Route } from 'react-router';
import './App.css';
import {Inicio} from '../src/components/Inicio';
import {Creacion} from  '../src/components/Creacion';
import Detalles from '../src/components/Detalles';
import Home from '../src/components/Home';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Inicio}/>
      <Route path='/home' component={Home}/>
      <Route path='/detalles' component={Detalles}/>
      <Route path='/creacion' component={Creacion}/>
    </div>
  );
}

export default App;
