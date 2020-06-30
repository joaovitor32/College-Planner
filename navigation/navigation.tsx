import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Colors } from "../colors/colors";

import FotosLista, { HeaderFotosLista } from "../pages/Fotos/Index";
import MateriasLista, { materiaIndexScreen } from "../pages/Materias/Index";
import CadastroMateria, {materiaCadastroScreen,} from "../pages/Materias/CadastroMateria";
import ListaFotosSelecionadas, {HeaderFotosListaSelecionadas,} from "../pages/Fotos/ListaFotosSelecionadas";
import  CalendarioLista,{calendarioIndexScreen} from '../pages/Calendario/Index'

import CadastrarFoto from "../pages/Fotos/CadastrarFoto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons,Ionicons,Entypo } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabOptions = {
  itemStyle: { marginVertical: 5 },
  labelStyle: { color: Colors.white, fontFamily: "Ubuntu_400Regular" },
  activeTintColor: Colors.gray,
  headerTitleStyle: { fontFamily: "Ubuntu_400Regular" },
  style: {
    backgroundColor: Colors.black,
    labelStyle: { color: Colors.white },
  },
  adaptive:true,
  safeAreaInset:{
    bottom:"always"
  }
};

const stack = {
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerTitleStyle: {
    color: Colors.white,
    fontFamily: "Ubuntu_400Regular",
  },
  headerLeft:()=>{return null}
};

const CalendarioStack = () => {
  return (
    <Stack.Navigator  screenOptions={stack}>
      <Stack.Screen
        name="CalendarioLista"
        options={calendarioIndexScreen}
        component={CalendarioLista}
      />
    </Stack.Navigator>
  );
};



const MateriasStack = () => {
  return (
    <Stack.Navigator  screenOptions={stack}>
      <Stack.Screen
        name="MateriasLista"
        options={materiaIndexScreen}
        component={MateriasLista}
      />
      <Stack.Screen
        name="MateriaNova"
        options={materiaCadastroScreen}
        component={CadastroMateria}
      />
    </Stack.Navigator>
  );
};

const FotosStack = () => {
  return (
    <Stack.Navigator screenOptions={stack}>
      <Stack.Screen
        name="FotosLista"
        options={HeaderFotosLista}
        component={FotosLista}
      />
      <Stack.Screen
        name="ListaFotosSelecionadas"
        options={HeaderFotosListaSelecionadas}
        component={ListaFotosSelecionadas}
      />
      <Stack.Screen name="CadastrarFoto" component={CadastrarFoto} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabOptions}>
        <Tab.Screen
          name="Materias"
          options={{
            tabBarLabel: "Matérias",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="subject" size={size} color={color} />
            ),
          }}
          component={MateriasStack}
        />
        <Tab.Screen
          name="Fotos"
          options={{
            tabBarLabel: "Fotos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-photos" size={size} color={color} />
            ),
          }}
          component={FotosStack}
        />
         <Tab.Screen
          name="Calendário"
          options={{
            tabBarLabel: "Calendário",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="calendar" size={size} color={color} />
            ),
          }}
          component={CalendarioStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  fontAwesome: {
    margin: Dimensions.get("window").height * 0.04,
  },
});

export default TabNavigation;
