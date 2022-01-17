import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import "./App.css";
import PokeData from "./components/PokeData";
import PokeSearch from "./components/PokeSearch";
import searchPokemonReducer from "./reducers/SearchPokemonReducer";

const store = createStore(searchPokemonReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact={true} component={PokeSearch} />
        <Route path="/pokemon/:pokemon" exact={true} component={PokeData} />
      </Router>
    </Provider>
  );
}

export default App;
