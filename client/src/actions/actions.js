import axios from "axios"


export function getRazas(raza) {
    return function(dispatch) {
      return axios.get("http://localhost:3001/dogs?name=" + raza)
        .then(result => {
          dispatch({ type: GET_RAZAS, payload: result.data });
        });
    };
  }
  export function getTemps(temp) {
    return function(dispatch) {
      return axios.get("http://localhost:3001/dogs")
        .then(result => {
          const razas = []
          console.log(result.data)
          result.data.forEach(e => {if(e.temperamento && e.temperamento.toLowerCase().includes(temp)){razas.push(e)}})
          console.log(razas)
          dispatch({ type: GET_TEMPS, payload: razas });
        });
    };
  }

  export const GET_RAZAS = "GET_RAZAS"
  export const GET_TEMPS = "GET_TEMPS"