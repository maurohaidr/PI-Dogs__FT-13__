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
import{ getRazas, getTemps } from '../actions/actions'
import React, { useState , useEffect} from 'react';
import { connect } from "react-redux";

const Home = (props) => {
    const [raza, setRaza] = useState('');
    const [filter, setFilter] = useState('Raza')
    const [order, setOrder] = useState('a-z')
    const [page, setPage] = useState(0)
    const [ascenDescen, setAscenDescen] = useState('Ascendente')
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
        if(filter === 'Raza') props.getRazas(raza.toLowerCase())
        if(filter === 'Temperamento') props.getTemps(raza.toLowerCase())
      }

    let toggleFilter = function(e){
      e.preventDefault();
      if(filter === 'Raza')
      setFilter('Temperamento')
      else setFilter('Raza')
    }
    let toggleascenDescen = function(e){
      e.preventDefault();
      if(ascenDescen === 'Ascendente'){
      setAscenDescen('Descendente')
      props.razas.reverse()
      }
      else {
        setAscenDescen('Ascendente')
        props.razas.reverse()
      }
    }

    let toggleOrder = function(e){
      e.preventDefault(); 
      if(order === 'a-z'){
      setOrder('Peso')
      props.razas && props.razas.sort((a, b) => ( parseInt(a.peso.slice(0 , 3)) > parseInt(b.peso.slice(0 , 3))) ? 1 : -1)
      //saco el promedio del peso y lo ordeno acorde a eso
      }
      if(order === 'Peso') {
      setOrder('a-z')
      props.razas && props.razas.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1)
      console.log('ordenados por nombre')
      }
    }

    let nextPage = function(e){
      e.preventDefault(); 
      if(props.razas.length >= page*8+8)
      setPage(page+1)
    }
    let prevPage = function(e){
      e.preventDefault();
      if(page>0) setPage(page-1)
    }

    return (
      <div className='homeCointainter'>
        <div className='bar'>
          <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <input
              className='input'
              type="text"
              autoComplete="off"
              value={raza}
              onChange={(e) => handleChange(e)}
            />
            <button className='btn' type="submit">BUSCAR</button>
          </form> 
          <span className='barItem'>Filtro:</span>
          <button className='btn' onClick={(e) => toggleFilter(e)}>{filter}</button>
          <span className='barItem' >Orden:</span>          
          <button className='btn' onClick={(e) => toggleOrder(e)}>{order}</button>
          <button className='btn' onClick={(e) => toggleascenDescen(e)}>{ascenDescen}</button>
          <button className='btn' onClick={(e) => prevPage(e)}>prev</button>
          <button className='btn' onClick={(e) => nextPage(e)}>next</button>
        </div>
        <div className='cardsBox'>
        {props.razas && props.razas.slice(page*8, page*8+8).map((e) => {
            return(
                <div className='razaCard'>
                  <img className='imgCard' src={e.imagen} width="240" height="160" alt="" />
                  <div className='textCard'>
                    <span>Name:</span><span>{e.nombre}</span>
                    <span>Temperament:</span><span>{e.temperamento}</span>
                    <span>Weight:</span><span>{e.peso}&nbsp;Lb</span>
                  </div>           
                </div>
                )}
            )             
        }
      {/*   {props.razas && props.razas.length<=page*8+8 && props.razas.map((e) => {
            return(            
                <div className='razaCard'>
                  <img className='imgCard' src={e.imagen} width="240" height="160" alt="" />
                  <div className='textCard'>
                    <span>Nombre:</span><span>{e.nombre}</span>
                    <span>Temperamento:</span>{e.temperamento}
                    <span>Peso:</span>{e.peso}     
                  </div>           
                </div>
                )}
            )             
        } */}
        </div>
        
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
      getTemps: temp => dispatch(getTemps(temp)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);