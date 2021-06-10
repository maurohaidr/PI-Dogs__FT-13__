/* Pagina inicial: deben armar una landing page con

[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal) */
import React from 'react';
import { Link } from 'react-router-dom';
import './inicio.css'

export function Inicio() {
    return (
      <div className='IniCointainter'>
          <Link to= '/home'>
              <button className='btnIni'>Start</button>
          </Link>  
          <div className='dogIni'>
             <img  src='https://www.animatedimages.org/data/media/202/animated-dog-image-0712.gif' alt="" />
          </div>   
      </div>
    )
  };
  
