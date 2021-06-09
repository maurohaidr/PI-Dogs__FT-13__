/* Ruta de detalle de raza de perro: debe contener

[ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida */


import { connect } from "react-redux";
import { getId } from '../actions/actions'
import React  from 'react';
import './detalles.css'
const Detalles = (props) => {
    console.log('detalles', props.det)
    return ( 
        <div className='detContainer'>
            {props.det ?
            <div>
            <div className='detBox'>
                <img className='imgDet' src={props.det.imagen} width="360" height="240" alt="" />
                <div className='textDet'>
                    <div className='textDetItem'><span>Name:</span>&nbsp;<span>{props.det.nombre}</span></div>
                    <div className='textDetItem'><span>Temperament:</span>&nbsp;<span>{props.det.temperamento}</span></div>
                    <div className='textDetItem'><span>Weight:</span>&nbsp;<span>{props.det.peso}&nbsp;lb</span></div>
                    <div className='textDetItem'><span>Height:</span>&nbsp;<span>{props.det.altura}&nbsp;inches</span></div>
                    <div className='textDetItem'><span>Life span:</span>&nbsp;<span>{props.det.vida}&nbsp;</span></div>
                </div>
            </div> 
            <div><img className='dogsDet' src='https://barks-and-recreation.com/wp-content/uploads/2018/04/Husky-Pups-Looking-Left-1000x753-min.png' width="540" height="360" alt="" /></div>
            </div>
            :
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