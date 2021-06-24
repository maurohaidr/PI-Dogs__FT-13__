import React, { useState, useEffect } from 'react';
import './creacion.css'
import axios from "axios"
import { Link } from "react-router-dom";
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
        chooseTemps: undefined,
        hidden: true
    })   
    
    useEffect(() => {
      async function getNames(){
      const names = await axios.get("http://localhost:3001/temperament")
      setState({
        ...state,
        chooseTemps: names.data
      })
      }
      getNames()
    }, [])

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
    const handleTemps = () => { 
      if(state.hidden === true){
        setState({
          ...state,
          hidden: false
        })
      }
      else{
        setState({
          ...state,
          hidden: true
        })
      }
    } 
    const addTemp = (e) => {
      if(!state.temperamento.includes(e.target.value)){
        if(state.temperamento === ''){
          setState({
            ...state,
            temperamento: e.target.value
          })
        }
        else{
        setState({
          ...state,
          temperamento: state.temperamento.concat(', ' + e.target.value)
        })
        } 
      }
      else{
        if(state.temperamento.includes(', ' + e.target.value))
        setState({
          ...state,
          temperamento: state.temperamento.replace(', ' + e.target.value, "", "gi")
        })
        else if(state.temperamento.includes(e.target.value + ', '))
        setState({
          ...state,
          temperamento: state.temperamento.replace(e.target.value + ', ', "", "gi")
        })
        else 
        setState({
          ...state,
          temperamento: state.temperamento.replace(e.target.value, "", "gi")
        })
      }
    }
    
    return (
      <div className='formBox'>
        <Link to='/home'>
            <button className='btnCreOut'>Back</button>
        </Link>
        <div className='form'>
        <span>(*) required fields</span><br/>&nbsp;
        <form  onSubmit={(e) =>handleSubmit(e)}>
          <div className='formItem'>
            <span>Name</span>&nbsp;
            <input className={state.exists? 'errorImput' : undefined} type="text" onChange={handleChange} value={state.nombre} name='nombre' placeholder='name' required />
            &nbsp;<span className='aligned'>*</span> 
          </div>        
          <div className='formItem'>
              <span>Temperament:</span>&nbsp;
              <input type="text" onChange={handleChange} value={state.temperamento} name='temperamento' placeholder='temp1, temp2, etc' required />
              &nbsp;<span>*</span>&nbsp;
              <span >or</span>&nbsp;
              <input className='btnCre' type='button' onClick={handleTemps} value="choose"/>                 
          </div>    
          <div className='formItem'>
              <span>Weight(lb)</span>&nbsp;
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.pesoMin} name='pesoMin' placeholder='min' required />
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.pesoMax} name='pesoMax' placeholder='max' required />
              &nbsp;<span className='aligned'>*</span> 
          </div>          
          <div className='formItem'>
              <span>Height(inches)</span>&nbsp;
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.alturaMin} name='alturaMin' placeholder='min' required />
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.alturaMax} name='alturaMax' placeholder='max' required />
              &nbsp;<span className='aligned'>*</span> 
          </div>          
          <div className='formItem'>
              <span>Life span(years)</span>&nbsp;
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.vidaMin} name='vidaMin' placeholder='min' required />
              <input className='shorterImput' type="number" min="0" onChange={handleChange} value={state.vidaMax} name='vidaMax' placeholder='max' required />
              &nbsp;<span className='aligned'>*</span> 
          </div>          
          <div className='formItem'>
              <span>Image</span>&nbsp;
              <input type="url" onChange={handleChange} value={state.imagen} name="imagen" placeholder="Url"/>
          </div>
          <div>
          <input className='btnCre' type='submit' value='Add'/>
          </div>
          <div>
          <span className='errorMsg'>{state.exists && <span className='errorText'>A breed with that name already exists</span>}</span>
          </div>
        </form>
        </div>
        <div className='tempsContainer'>
                {state.chooseTemps && !state.hidden && state.chooseTemps.map(e => {
                  return(
                    <div>  
                    <label for={e}>{e}</label>
                    <input onChange={(e) => addTemp(e)} type="checkbox" name={e} value={e} />    
                    </div>
                    )
                  })            
                }    
              </div> 
      </div>
    )
  };

  
  
