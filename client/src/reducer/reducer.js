import { GET_RAZAS, GET_TEMPS, RESET, GET_RAZAS_ID, GET_ID } from '../actions/actions'

const initialState = {
    razas: undefined,
    detalle: undefined,
    /* id: undefined */
  }

export default function reducer(state = initialState, action) {
    switch(action.type){
      case GET_RAZAS: {
        console.log('reducer')
        return{
        ...state,
        razas: action.payload
        }
      }
      /* case GET_ID: {
        return{
        ...state,
        id: action.payload
        }
      } */
      case GET_TEMPS: {
        return{
        ...state,
        razas: action.payload
        }
      }
      case GET_RAZAS_ID: {
        console.log('reducer',action.payload)
        return{
        ...state,
        detalle: action.payload
        }
      }
      case RESET: {
        return{
        ...state,
        razas: undefined
        }
      }
      default:{
        return state
      }
    }
  }