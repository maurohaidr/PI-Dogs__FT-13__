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
        nombre: '',
        temperamento: '',
        peso: '',
        altura: '',
        vida: '',
        imagen: '',
        exists: false, 
    })
    const handleChange = () => {        
        setState({
            nombre: document.querySelector('input[name=nombre]').value,
            temperamento: document.querySelector('input[name=temperamento]').value,
            peso: document.querySelector('input[name=peso]').value,
            altura: document.querySelector('input[name=altura]').value,
            vida: document.querySelector('input[name=vida]').value,
            imagen: document.querySelector('input[name=imagen]').value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const names = await axios.get("http://localhost:3001/dogNames")
        if(names.data.includes(state.nombre)) setState({
            ...state,
            exists:true
        })
        else setState({
            ...state,
            exists:false
        })        
        console.log(state)
        axios.post("http://localhost:3001/dog", state)
        .then(response => {
            return (
                <div><h1>{response}</h1></div>
            )
        })
      }
      
    return (
      <div className='formBox'>
        <form className='form' onSubmit={(e) =>handleSubmit(e)}>
          <div className='formItem'>
            <span>Name</span>&nbsp;
            <input className={state.exists && 'error'} type="text" onChange={handleChange} value={state.nombre} name='nombre' placeholder='name' required />
            <span>{state.exists && <span>A breed with that name already exists</span>}</span>
          </div>        
          <div className='formItem'>
              <span>Tempetament:</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.temperamento} name='temperamento' placeholder='temp1, tem2, etc' required />
          </div>          
          <div className='formItem'>
              <span>Weight(lb)</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.peso} name='peso' placeholder='n - n' required />
          </div>          
          <div className='formItem'>
              <span>Height(inches)</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.altura} name='altura' placeholder='n - n' required />
          </div>          
          <div className='formItem'>
              <span>Life span</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.vida} name='vida' placeholder='n - n years' required />
          </div>          
          <div className='formItem'>
              <span>Image</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.imagen} name="imagen" placeholder="Url" required />
          </div>
          <input type='submit' value='Add'/>
        </form>  
      </div>
    )
  };

  
  
