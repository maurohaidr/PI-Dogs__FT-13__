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
import{ getRazas, getTemps, reset, getId } from '../actions/actions'
import React, { useState } from 'react';
import { connect } from "react-redux";
import {BiLeftArrow, BiRightArrow, BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi";

const Home = (props) => {

    const [raza, setRaza] = useState('');
    const [filter, setFilter] = useState('Breed')
    const [order, setOrder] = useState('a-z')
    const [page, setPage] = useState(0)
    const [ascenDescen, setAscenDescen] = useState('BiUpArrowAlt')
    const [searching, setSearching] = useState(false)

    props.getId(undefined) // seteo el detalle en undefined, para que no se guarde el detalle anterior al volver al home

    let handleChange = function (e) {
        setRaza(e.target.value);
    }
    let handleSubmit = function(e) {
        e.preventDefault(); 
        props.getRazas(undefined)
        setSearching(true)
        if(filter === 'Breed') props.getRazas(raza.toLowerCase())
        if(filter === 'Temperament') props.getTemps(raza.toLowerCase())
    }
    let toggleFilter = function(e){
      e.preventDefault();
      if(filter === 'Breed'){
        setFilter('Temperament')
      }
      else {  
        setFilter('Breed')    
      }
    }
    let toggleascenDescen = function(e){
      e.preventDefault();
      if(ascenDescen === 'BiDownArrowAlt'){
      setAscenDescen('BiUpArrowAlt')
      props.razas.reverse()
      }
      else {
        setAscenDescen('BiDownArrowAlt')
        props.razas.reverse()
      }
    }
    let toggleOrder = function(e){
      e.preventDefault(); 
      if(order === 'a-z'){
          setOrder('Weight')
          props.razas && props.razas.sort((a, b) => ( parseInt(a.peso.slice(0 , 3)) > parseInt(b.peso.slice(0 , 3))) ? 1 : -1)
      //saco el promedio del peso y lo ordeno acorde a eso
      }
      if(order === 'Weight') {
          setOrder('a-z')
          props.razas && props.razas.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1)
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
            <button className='btn' type="submit">Search</button>
          </form> 
          <span className='barItem'>Search by:</span>
          <button className='btn' onClick={(e) => toggleFilter(e)}>{filter}</button>
          <span className='barItem' >Order by:</span>          
          <button className='btn' onClick={(e) => toggleOrder(e)}>{order}</button>
          <button className='btn' onClick={(e) => toggleascenDescen(e)}>
            {ascenDescen === 'BiUpArrowAlt' && <BiUpArrowAlt/>}
            {ascenDescen === 'BiDownArrowAlt' && <BiDownArrowAlt/>}
          </button>
          <Link to='/creacion'>
            <button className='btn'>Add new breed</button>
          </Link>
        </div>
        <div className='pageBox'>
          {props.razas && props.razas.length > 0 ? 
          <div className='btnPageBox'>
            <button className='btnPage' onClick={(e) => prevPage(e)}><BiLeftArrow /></button>
            <span className='numberPage'>{page + 1}/{Math.ceil(props.razas.length/8)}</span>
            <button className='btnPage' onClick={(e) => nextPage(e)}><BiRightArrow/></button>   
          </div>
          : null
          }
          
          <div className='cardsBox'>
            {props.razas && props.razas.length > 0 ? props.razas.slice(page*8, page*8+8).map((e) => {
              return(
                <Link key={e.id} to={'/detalles'}>
                  <div  onClick={() => {props.getId(
                      {id:e.id, imagen:e.imagen, nombre:e.nombre, temperamento:e.temperamento, peso:e.peso, altura:e.altura, vida:e.vida}
                  )}} 
                    className='razaCard'>
                    <img className='imgCard' src={e.imagen} width="240" height="160" alt="" />
                    <div className='textCard'>
                      <span className='homeName'>{e.nombre}</span>
                      <span>Temperament:</span><span>{e.temperamento}</span>
{/*                       <span>Weight:</span><span>{e.peso}&nbsp;Lb</span> */}
                    </div>
                  </div>
                </Link>
                  )
            })
            : props.razas && props.razas.length < 1? <div className='razaCardNotFound'>
              <img className='imgCard' src='https://besthqwallpapers.com/Uploads/12-6-2018/55353/thumb2-pug-sad-dog-puppy-dogs-sad-eyes.jpg' width="480" height="320" alt="" />
              <span className='textCardNotFound'>Sorry, but we couldn't find any breed to match your search!</span>
              </div> 
            : searching &&
              <div className='loadingHome'>
                  <img src='https://www.petbarn.com.au/skin/frontend/enterprise/petbarn/images/dropdowns/dropdown_dog.gif' width="480" height="320" alt="" />
                  <span>Loading..</span>
              </div>                             
            }
          </div>
          
        </div>
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
      getId: id => dispatch(getId(id)),
      reset: () => dispatch(reset())
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);