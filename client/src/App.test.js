import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Link, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store"
import App from './App'
import thunk from 'redux-thunk'
import Home from './components/Home';
import { Inicio } from './components/Inicio';

configure({adapter: new Adapter()});

describe('Home', () => {
  let wrapper;
  let store;
  const state = {
    razas:[
      {
        id: 1,
        nombre:"perro 1",
        peso:"12 -15",
        altura:"12 - 15",
        vida:"12 - 15",
        imagen:"random url",
        temperamento:"torpe, jugueton, alegre"
      },
      { 
        id: 2,
        nombre:"perro 2",
        peso:"12 -15",
        altura:"12 - 15",
        vida:"12 - 15",
        imagen:"random url",
        temperamento:"torpe, jugueton, alegre"
      }
    ],
  } 
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares);
    store = mockStore(state);
  
  beforeEach(() => {    
    wrapper =  mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/home' ]}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  })
  it('debe renderizar el componente Home', () => {
    expect(wrapper.find(Home)).toHaveLength(1);
  })
  it('debe generar un link por cada elemento del store renderizado', () => {
    expect(wrapper.find(Link)).toHaveLength(3) //2 on store + 1 for creation
  })
  
});