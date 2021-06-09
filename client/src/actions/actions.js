import axios from "axios"


export function getId(id) {
  if(id === undefined) {
    return function(dispatch) {
      dispatch({ type: GET_ID, payload: undefined });
    }
  }
  return function(dispatch) {
    console.log(id)
        dispatch({ type: GET_ID, payload: id });
  };
}


export function getRazas(raza) {
    if(raza === undefined) {
      return function(dispatch) {
        dispatch({ type: GET_RAZAS, payload: undefined });
      }
    }
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

  export const RESET = "RESET"
  export const GET_RAZAS = "GET_RAZAS"
  export const GET_TEMPS = "GET_TEMPS"
  export const GET_ID = "GET_ID"