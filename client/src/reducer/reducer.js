import { GET_RAZAS, GET_TEMPS } from '../actions/actions'

const initialState = {
    razas: undefined
  }

export default function reducer(state = initialState, action) {
    switch(action.type){
      case GET_RAZAS: {
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
      default:{
        return state
      }
    }
  }