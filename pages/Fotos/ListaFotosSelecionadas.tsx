import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";
import { Colors } from "../../colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as FotoAction from '../../store/actions/Fotos'

interface state {
  fotos: {
    items: {
      idFoto: number;
      idMateria:number;
      imageUri:string    
    }[];
  };
}

const ListaFotosSelecionadas: React.FC = ({ navigation, route }: any) => {
  const { id, title } = route.params;

  const dispatch=useDispatch();
  const fotos=useSelector((state:state)=>state.fotos.items);

  console.log(fotos)

  useEffect(()=>{
    dispatch(FotoAction.loadFotos(id));
  },[dispatch])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Fotos de ${title}`,
      headerRight: () => {
        return (
          <View style={styles.containerHeaderRight}>
            <Ionicons
              name="ios-arrow-back"
              size={28}
              color={Colors.white}
              style={{ marginHorizontal: 5 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <AntDesign
              name="plus"
              size={28}
              color={Colors.white}
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                navigation.navigate("CadastrarFoto",{
                  id:id
                })
              }}
            />
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      <Text>Fotos Selecionadas</Text>
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  containerHeaderRight: {
    flexDirection: "row",
  },
});

export default ListaFotosSelecionadas;
