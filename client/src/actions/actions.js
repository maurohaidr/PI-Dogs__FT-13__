import axios from "axios"

/* export function getId(id) {
  console.log('1')
  return async function(dispatch) {
    console.log('2')
    const result = await axios.get("http://localhost:3001/dogs");
    console.log('3');
    let filtrado = result.data.filter(e => e.id === id);
    console.log('filtrado', filtrado);
    dispatch({ type: GET_RAZAS_ID, payload: filtrado });
  };
} */
export function getId(id) {
  if(id === undefined) {
    return function(dispatch) {
      dispatch({ type: GET_RAZAS_ID, payload: undefined });
    }
  }
  return function(dispatch) {
    return axios.get("http://localhost:3001/dogs")
      .then(result => {
        const filtrado = result.data.filter(e => e.id === id);
        dispatch({ type: GET_RAZAS_ID, payload: filtrado });
      })
  };
}

export function getRazas(raza) {
    console.log('actions', 1)
    return async function(dispatch) {
      console.log('actions', 2)
      const result = await axios.get("http://localhost:3001/dogs?name=" + raza);
      console.log('actions', 3);
      dispatch({ type: GET_RAZAS, payload: result.data });
    };
}



export function getTemps(temp) {
  return function(dispatch) {
    return axios.get("http://localhost:3001/dogs")
      .then(result => {
        const razas = []
        result.data.forEach(e => {if(e.temperamento && e.temperamento.toLowerCase().includes(temp)){razas.push(e)}})
        dispatch({ type: GET_TEMPS, payload: razas });
      });
  };
}
export function reset() {
  return function(dispatch) {
         dispatch({ type: RESET });      
  };
}
/* export function getId(id) {
  return function(dispatch) {
    console.log('action', id)
         dispatch({ type: GET_ID, payload:id });      
  };
} */

  export const RESET = "RESET"
  export const GET_RAZAS = "GET_RAZAS"
  export const GET_TEMPS = "GET_TEMPS"
  export const GET_RAZAS_ID = "GET_RAZAS_ID"
  export const GET_ID = "GET_ID"