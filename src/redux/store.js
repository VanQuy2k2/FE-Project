import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import cartsReducer from './features/cartSlice';

const rootReducer = combineReducers({
  cart: cartsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
