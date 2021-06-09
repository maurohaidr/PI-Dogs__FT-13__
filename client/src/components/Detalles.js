/* Ruta de detalle de raza de perro: debe contener

[ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida */


import { connect } from "react-redux";
import { getId } from '../actions/actions'
import React, { useState , useEffect} from 'react';
import './detalles.css'
const Detalles = (props) => {
    console.log('detalles', props.det)
    return ( 
        <div>
            {props.det && 
            <div>
                <img src={props.det.imagen} width="480" height="320" alt="" />
                <div className='textDet'>
                    <span>Name:</span><span>{props.det.nombre}</span>
                    <span>Temperament:</span><span>{props.det.temperamento}</span>
                    <span>Weight:</span><span>{props.det.peso}&nbsp;Lb</span>
                    <span>Height:</span><span>{props.det.altura}&nbsp;Ft</span>
                    <span>Life span:</span><span>{props.det.vida}&nbsp;years</span>
                </div>
            </div> 
            || 
            <div>
                <img src='http://northerntechmap.com/assets/img/loading-dog.gif' width="480" height="320" alt="" />
            </div>
            }
        </div>
        )
};

  function mapStateToProps(state) {
    return {
        det:state.detalle
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getId: raza => dispatch(getId(raza)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detalles);