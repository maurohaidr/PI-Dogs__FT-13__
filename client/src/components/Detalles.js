import { connect } from "react-redux";
import { getId } from '../actions/actions'
import React, { useEffect } from 'react';
import './detalles.css'
import { Link } from "react-router-dom";

const Detalles = (props) => {    
    useEffect(() => props.getId(props.match.params.id), [props.match.params.id]) 
    return ( 
        <div className='detContainer'>
            <div>
              <img className='dogsDet' src='https://barks-and-recreation.com/wp-content/uploads/2018/04/Husky-Pups-Looking-Left-1000x753-min.png' width="540" height="360" alt="" />
            </div>
            <Link to='/home'>
            <button className='btnDet'>Back</button>
            </Link>
            {props.det ?
            <div >
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
            </div>
            : 
            <div classNamea='loadingDet'>
              <div><img src='https://www.petbarn.com.au/skin/frontend/enterprise/petbarn/images/dropdowns/dropdown_dog.gif' width="480" height="320" alt="" /></div>
              <div><span>Loading..</span></div>
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
        getId: id => dispatch(getId(id)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detalles);