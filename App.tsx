import React from "react";
import DrawerNavigation from "./navigation/navigation";

import { initFotos, initMaterias } from "./helpers/db";

import { AppLoading } from "expo";
import { Ubuntu_400Regular, useFonts } from "@expo-google-fonts/ubuntu";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import MateriasReducer from "./store/reducers/Materia";
import FotoReducer from "./store/reducers/Fotos";

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

const rootReducer = combineReducers({
  fotos: FotoReducer,
  materias: MateriasReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <DrawerNavigation />
    </Provider>
  );
}
