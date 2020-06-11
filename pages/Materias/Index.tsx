import React, { useEffect} from "react";
import { StyleSheet, Text, View,FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LinearGradientBox from "../../components/LinearGradientBox";

import {useSelector,useDispatch} from 'react-redux';
import * as MateriasAction from '../../store/actions/Materia'
import DisplayMateria from "../../components/materias/DisplayMateria";

const MateriasLista: React.FC = ({ navigation }:any) => {

  const materias=useSelector((state:any)=>state.materias.items);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(MateriasAction.loadMaterias())
  },[dispatch])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Matérias",
      headerRight: () => {
        return (
          <AntDesign
            style={{ marginHorizontal: 10 }}
            name="plus"
            size={28}
            color={Colors.white}
            onPress={() => {
              navigation.navigate("Materias", {
                screen: "MateriaNova",
                initial: false,
              });
            }}
          />
        );
      },
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      {materias.length!=0?<FlatList
        data={materias}
        renderItem={({item,index,separators})=>(
            <DisplayMateria
              key={String(item.id)}
              title={item.title}
              periodo={item.periodo}
              description={item.description}
            />
        )}
      />:
        <View style={styles.boxText}>
          <Text style={styles.textNoContent}>Não exite nenhuma matéria cadastrada!</Text>
        </View>
      }
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  boxText:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    textAlign:"center"
  },
  textStyles: {
    fontSize: 30,
    fontFamily: "Ubuntu_400Regular",
  },
  textNoContent:{
    fontFamily: "Ubuntu_400Regular",
    color:Colors.black,
    fontSize:18,
    margin:10,
    flexWrap:'wrap',
  }
});

export default MateriasLista;
