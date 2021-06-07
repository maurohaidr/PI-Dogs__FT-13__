/* Ruta principal: debe contener

[ ] Input de búsqueda para encontrar razas de perros por nombre
[ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
Imagen
Nombre
Temperamento
[ ] Botones/Opciones para filtrar por por temperamento y por raza existente o agregada por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por orden alfabético y por peso
[ ] Paginado para ir buscando y mostrando las siguientes razas */
import { Link } from 'react-router-dom';
import './home.css'
import{ getRazas } from '../actions/actions'
import React, { useState , useEffect} from 'react';
import { connect } from "react-redux";

const Home = (props) => {
    const [raza, setRaza] = useState('');
    const [filter, setFilter] = useState('Raza')
    const [order, setOrder] = useState('a-z')

    /* useEffect(() => {  
      console.log(props.razas)  
      {props.razas && props.razas.map((e) => {
        return(            
            <div className='razaCard'>
            <span>Nombre:</span><span>{e.nombre}</span>
            <span>Temperamento:</span>{e.temperamento}
            <img src={e.imagen} width="200" height="200" alt="" />
            </div>
            )}
        )             
      }
    }, [props.razas]) */
    let handleChange = function (e) {
        setRaza(e.target.value);
      }

    let handleSubmit = function(e) {
        e.preventDefault(); 
        props.getRazas(raza)
      }
    let toggleFilter = function(e){
      e.preventDefault();
      if(filter === 'Raza')
      setFilter('Temperamento')
      else setFilter('Raza')
    }
    let toggleOrder = function(e){
      e.preventDefault(); 
      if(order === 'a-z'){
      setOrder('Peso')
      props.razas && props.razas.sort((a, b) => (a.weight.metric > b.weight.metric) ? 1 : -1)
      }else setOrder('a-z')
      props.razas && props.razas.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }

    return (
      <div className='homeCointainter'>
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="text"
              autoComplete="off"
              value={raza}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form> 
        <span>Filtro:</span>
        <button onClick={(e) => toggleFilter(e)}>{filter}</button>
        <span>Orden:</span>
        <button onClick={(e) => toggleOrder(e)}>{order}</button>
        {props.razas && props.razas.map((e) => {
            return(            
                <div className='razaCard'>
                <span>Nombre:</span><span>{e.nombre}</span>
                <span>Temperamento:</span>{e.temperamento}
                <img src={e.imagen} width="200" height="200" alt="" />
                </div>
                )}
            )             
        }
        
        {/* <div className='bar'><span>Buscar</span><button>raza/temperamento</button><input></input>
        <button>ordenar por peso/alfabeticamente</button><button>ascendente/descendente</button></div> */}
        
      </div>      
    )
  };

  function mapStateToProps(state) {
    return {
        razas:state.razas
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getRazas: raza => dispatch(getRazas(raza)), 
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);