import React from 'react'
import {Dimensions,StyleSheet} from 'react-native'
import { NavigationContainer,useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from '../colors/colors'

import FotosLista from '../pages/Fotos/Index';
import MateriasLista from '../pages/Materias/Index';
import { MaterialIcons } from '@expo/vector-icons'; 
import CadastroMateria from '../pages/Materias/CadastroMateria';
import ListaFotosSelecionadas from '../pages/Fotos/ListaFotosSelecionadas';
import CadastrarFoto from '../pages/Fotos/CadastrarFoto';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerOptions={
    itemStyle: { marginVertical: 5 },
    labelStyle:{color:Colors.white,fontFamily:'Ubuntu_400Regular'},
    activeTintColor: Colors.gray,
    headerTitleStyle:{fontFamily:'Ubuntu_400Regular'},
    style:{
        backgroundColor:Colors.black,
        labelStyle:{color:Colors.white
        }
    }
}

const stack=()=>{
    const navig:any=useNavigation();
    return {headerStyle:{
        backgroundColor:Colors.black,
    },
    headerTitleStyle:{
        color:Colors.white,
        fontFamily:'Ubuntu_400Regular'
    },
    headerLeft:()=>(
        <MaterialIcons 
            name="menu" 
            size={28} 
            color={Colors.white} 
            style={styles.menu}
            onPress={()=>{
                navig.toggleDrawer()   
            }}
        />    
    )}
}

const MateriasStack=()=>{
    return (
        <Stack.Navigator screenOptions={stack}>
            <Stack.Screen name="MateriasLista" component={MateriasLista} />
            <Stack.Screen name="MateriaNova" component={CadastroMateria} />
        </Stack.Navigator>
    )
}

const FotosStack=()=>{
    return (
        <Stack.Navigator screenOptions={stack}>
            <Stack.Screen name="FotosLista" component={FotosLista} />
            <Stack.Screen name="ListaFotosSelecionadas" component={ListaFotosSelecionadas} />
            <Stack.Screen name="CadastrarFoto" component={CadastrarFoto} />
        </Stack.Navigator>
    )
}

const DrawerNavigation=()=> {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Materias"  drawerContentOptions={drawerOptions} >
                <Drawer.Screen name="Materias" component={MateriasStack} />
                <Drawer.Screen name="Fotos" component={FotosStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
  }

const styles=StyleSheet.create({
    fontAwesome:{
        margin:Dimensions.get('window').height*0.04
    },
    menu:{
        marginHorizontal:15,
    }
})
  

export default DrawerNavigation;