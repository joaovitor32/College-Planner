import React from "react";
import TabNavigation from "./navigation/navigation";

import { initFotos, initMaterias, initEventos } from "./helpers/db";

import { AppLoading } from "expo";
import { Ubuntu_400Regular, useFonts } from "@expo-google-fonts/ubuntu";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import MateriasReducer from "./store/reducers/Materia";
import FotoReducer from "./store/reducers/Fotos";

const rootReducer = combineReducers({
  materias: MateriasReducer,
  fotos: FotoReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

initMaterias()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

initFotos()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

initEventos()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

export default function App() {
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <TabNavigation />
      </Provider>
    );
  }
}
