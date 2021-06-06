import axios from "axios"


export function getRazas(raza) {
    return function(dispatch) {
      return axios.get("http://localhost:3001/dogs?name=" + raza)
        .then(result => {
          dispatch({ type: GET_RAZAS, payload: result.data });
        });
    };
  }

  export const GET_RAZAS = "GET_RAZAS"