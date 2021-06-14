import { GET_RAZAS, GET_TEMPS, GET_ID } from '../actions/actions'

const initialState = {
    razas: undefined,
    detalle: undefined,
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
      case GET_TEMPS: {
        return{
        ...state,
        razas: action.payload
        }
      }
      case GET_ID: {
        console.log('reducer',action.payload)
        return{
        ...state,
        detalle: action.payload
        }
      }
      default:{
        return state
      }
    }
  }