import React from 'react';

export default function Dog ({nombre, temperamento, imagen}){
    return(
        <div>
        <span>Nombre:</span><span>{nombre}</span>
        <span>Temperamento:</span>{temperamento}
        <img src={imagen} width="200" height="200" alt="" />
        </div>
    )
}


                