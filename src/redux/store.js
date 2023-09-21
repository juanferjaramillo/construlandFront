import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import uReducer from "./uReducer";
import pReducer from "./pReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS

const rootReducer = combineReducers({
    product: pReducer,
    users: uReducer
});

const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunk)));
export default store;