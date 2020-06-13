import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Button } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import ImgPicker from "../../components/fotos/ImagePicker";
import { Ionicons } from "@expo/vector-icons";
import {Colors} from '../../colors/colors'
import { useDispatch } from 'react-redux';

import * as fotoActions from '../../store/actions/Fotos'

const CadastrarFoto: React.FC = ({ navigation,route }: any) => {
  
  const {id} =route.params;
  const [chosedImage,setChosedImage]=useState('');
  const dispatch=useDispatch();

  const handleChosedImage=()=>{
    if(chosedImage){
      dispatch(fotoActions.addFoto(chosedImage,id));
      navigation.goBack();
    }
  } 

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Cadastrar Foto",
      headerRight: () => {
        return (
            <Ionicons
              name="ios-arrow-back"
              size={28}
              color={Colors.white}
              style={{ marginHorizontal:20 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
        );
      },
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      <ImgPicker cadastrarImagem={handleChosedImage} chosedImage={setChosedImage}/>
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  
});

export default CadastrarFoto;
