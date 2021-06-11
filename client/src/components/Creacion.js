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
        })
    }
    
    const handleSubmit = async e => {        
        e.preventDefault()
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
            axios.post("http://localhost:3001/dog", state)
            alert('Breed created')
        }             
      }
      
    return (
      <div className='formBox'>
        <form className='form' onSubmit={(e) =>handleSubmit(e)}>
          <div className='formItem'>
            <span>Name</span>&nbsp;
            <input className={state.exists && 'errorImput'} type="text" onChange={handleChange} value={state.nombre} name='nombre' placeholder='name' required />
            &nbsp;<span>*</span> 
          </div>        
          <div className='formItem'>
              <span>Tempetament:</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.temperamento} name='temperamento' placeholder='temp1, tem2, etc' required />
              &nbsp;<span>*</span> 
          </div>          
          <div className='formItem'>
              <span>Weight(lb)</span>&nbsp;
              <input className='shorterImput' type="number" onChange={handleChange} value={state.pesoMin} name='pesoMin' placeholder='min' required />
              <input className='shorterImput' type="number" onChange={handleChange} value={state.pesoMax} name='pesoMax' placeholder='max' required />
              &nbsp;<span>*</span> 
          </div>          
          <div className='formItem'>
              <span>Height(inches)</span>&nbsp;
              <input className='shorterImput' type="number" onChange={handleChange} value={state.alturaMin} name='alturaMin' placeholder='min' required />
              <input className='shorterImput' type="number" onChange={handleChange} value={state.alturaMax} name='alturaMax' placeholder='max' required />
              &nbsp;<span>*</span> 
          </div>          
          <div className='formItem'>
              <span>Life span(years)</span>&nbsp;
              <input className='shorterImput' type="number" onChange={handleChange} value={state.vidaMin} name='vidaMin' placeholder='min' required />
              <input className='shorterImput' type="number" onChange={handleChange} value={state.vidaMax} name='vidaMax' placeholder='max' required />
              &nbsp;<span>*</span> 
          </div>          
          <div className='formItem'>
              <span>Image</span>&nbsp;
              <input type="url" onChange={handleChange} value={state.imagen} name="imagen" placeholder="Url"/>
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

  
  
