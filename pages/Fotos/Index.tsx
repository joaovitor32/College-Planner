import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradientBox from '../../components/LinearGradientBox';

const FotosLista:React.FC=({navigation}:any)=> {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Fotos"
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      <View >
        <Text>Fotos</Text>
      </View>
    </LinearGradientBox>
  );
}



export default FotosLista;