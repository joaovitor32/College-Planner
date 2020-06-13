import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";
import { Colors } from "../../colors/colors";


const CadastrarFoto: React.FC = ({ navigation }: any) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Cadastrar Foto",
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

export default CadastrarFoto;
