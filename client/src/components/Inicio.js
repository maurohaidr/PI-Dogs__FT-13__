import React from 'react';
import { Link } from 'react-router-dom';
import './inicio.css'

export function Inicio() {
    return (
      <div className='IniCointainter'>
          <div className='textIni'>
              <span>Hello fellow dog lover, i´m Mauro.</span><br/>
              <span>This is mi individual proyect for Henry´s full stack developer program. </span><br/>
              <span>Take a sit and begin your search, or add new dogs to our database. </span><br/>
              <span>Enjoy!</span>
          </div>
          <Link to= '/home'>
              <button className='btnIni'>Sit here</button>
          </Link>  
          <div className='dogIni'>
             <img  src='https://www.animatedimages.org/data/media/202/animated-dog-image-0712.gif' alt="" />
          </div>   
      </div>
    )
  };
  
