import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";
import { Colors } from "../../colors/colors";


const ListaFotosSelecionadas: React.FC = ({ navigation,route }: any) => {
  
  const { id, title } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Fotos de ${title}`,
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      <Text>Fotos Selecionadas</Text>
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  
});

export default ListaFotosSelecionadas;
