/* Pagina inicial: deben armar una landing page con

[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal) */
import React from 'react';
import { Link } from 'react-router-dom';
import './inicio.css'

export function Inicio() {
    return (
      <div className='IniCointainter'>
          <h1>Inicio</h1>
          <Link to= '/home'>
              <button>Ir al Home</button>
          </Link>     
      </div>
    )
  };
  
