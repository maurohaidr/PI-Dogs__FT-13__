/* Ruta de creación de raza de perro: debe contener

[ ] Un formulario controlado con los siguientes campos
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro */
import React, { useState } from 'react';
import './creacion.css'
import axios from "axios"

export function Creacion() {

    const[state, setState] = useState({
        pesoMin: '',
        pesoMax: '',
        alturaMin: '',
        alturaMax: '',
        vidaMin: '',
        vidaMax: '',
        nombre: '',
        temperamento: '',
        peso: '',
        altura: '',
        vida: '',
        imagen: '',
        exists: false, 
        success: false,
    })

    const isValidUrl = (str) => {
        let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
              if (regexp.test(str))
              {
                return true;
              }
              else
              {
                return false;
              }
      }
 
    const handleChange = () => {   
        setState({
            ...state,
            pesoMin: document.querySelector('input[name=pesoMin]').value,
            pesoMax: document.querySelector('input[name=pesoMax]').value,
            alturaMin: document.querySelector('input[name=alturaMin]').value,
            alturaMax: document.querySelector('input[name=alturaMax]').value,
            vidaMin: document.querySelector('input[name=vidaMin]').value,
            vidaMax: document.querySelector('input[name=vidaMax]').value,
            nombre: document.querySelector('input[name=nombre]').value,
            temperamento: document.querySelector('input[name=temperamento]').value,
            peso: state.pesoMin.concat(' - ').concat(state.pesoMax),
            altura: state.alturaMin.concat(' - ').concat(state.alturaMax),
            vida: state.vidaMin.concat(' - ').concat(state.vidaMax).concat(' years'),
            imagen: document.querySelector('input[name=imagen]').value,
            success: false,
            notUrl: false
        })
    }
    
    const handleSubmit = async e => {        e.preventDefault()

        const names = await axios.get("http://localhost:3001/dogNames")
        if(names.data.includes(state.nombre)) {
          setState({
            ...state,
            exists:true
          })
        }
        else {
            setState({
            ...state,
            exists:false
            })
            alert('Breed created')
        }

        if(isValidUrl(state.imagen)) axios.post("http://localhost:3001/dog", state)
        else {setState({
            ...state,
            notUrl:true
        })}
        
      }
      
    return (
      <div className='formBox'>
        <form className='form' onSubmit={(e) =>handleSubmit(e)}>
          <div className='formItem'>
            <span>Name</span>&nbsp;
            <input className={state.exists && 'errorImput'} type="text" onChange={handleChange} value={state.nombre} name='nombre' placeholder='name' required />&nbsp;
          </div>        
          <div className='formItem'>
              <span>Tempetament:</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.temperamento} name='temperamento' placeholder='temp1, tem2, etc' required />
          </div>          
          <div className='formItem'>
              <span>Weight(lb)</span>&nbsp;
              <input className='shorterImput' type="number" onChange={handleChange} value={state.pesoMin} name='pesoMin' placeholder='min' required />
              <input className='shorterImput' type="number" onChange={handleChange} value={state.pesoMax} name='pesoMax' placeholder='max' required />
          </div>          
          <div className='formItem'>
              <span>Height(inches)</span>&nbsp;
              <input className='shorterImput' type="number" onChange={handleChange} value={state.alturaMin} name='alturaMin' placeholder='min' required />
              <input className='shorterImput' type="number" onChange={handleChange} value={state.alturaMax} name='alturaMax' placeholder='max' required />
          </div>          
          <div className='formItem'>
              <span>Life span(years)</span>&nbsp;
              <input className='shorterImput' type="number" onChange={handleChange} value={state.vidaMin} name='vidaMin' placeholder='min' required />
              <input className='shorterImput' type="number" onChange={handleChange} value={state.vidaMax} name='vidaMax' placeholder='max' required />
          </div>          
          <div className='formItem'>
              <span>Image</span>&nbsp;
              <input className={state.notUrl && 'errorImput'} type="text" onChange={handleChange} value={state.imagen} name="imagen" placeholder="Url" required />
          </div>
          <div>
          <input type='submit' value='Add'/>
          </div>
          <div>
          <span className='errorMsg'>{state.exists && <span className='errorText'>A breed with that name already exists</span>}</span>
          </div>
          <span className='errorMsg'>{state.notUrl && <span className='errorText'>Image must be an Url</span>}</span>
        </form>  
      </div>
    )
  };

  
  
