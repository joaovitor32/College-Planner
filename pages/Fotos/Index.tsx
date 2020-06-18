import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";
import { Colors } from "../../colors/colors";
import { FlatList } from "react-native-gesture-handler";
import DisplayMateria from "../../components/fotos/DisplayMaterias";
import HeaderLeft from '../../components/header/HeaderLeft'
import { Ionicons } from '@expo/vector-icons'

interface state {
  materias: {
    items: {
      id: number;
      title: string;
    }[];
  };
}

const FotosLista: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const materias = useSelector((state: state) => state.materias.items);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMat,setLoadMat]=useState(false)

  const loadMaterias = useCallback(async () => {
    try {
      await dispatch(MateriasAction.loadMaterias());
    } catch (err) {
      Alert.alert(err);
    }
  }, [dispatch]);

  useEffect(() => {
    
    setIsLoading(true);
    loadMaterias().then(() => {
      setIsLoading(false);
    });
    setLoadMat(false)

  }, [loadMaterias,loadMat]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Fotos",
    });
  }, [navigation]);
  

  return (
    <LinearGradientBox>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={80} color={Colors.black} />
        </View>
      ) : materias.length != 0 ? (
        <View style={styles.container}>
          <FlatList
            data={materias}
            renderItem={({ item }) => (
              <DisplayMateria loadMaterias={setLoadMat} key={item.id} title={item.title} id={item.id} />
            )}
            horizontal={false}
            numColumns={2}
          />
        </View>
      ) : (
        <View style={styles.boxText}>
          <Text style={styles.textNoContent}>
            Não exite nenhuma matéria cadastrada!
          </Text>
        </View>
      )}
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },
  boxText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textNoContent: {
    fontFamily: "Ubuntu_400Regular",
    color: Colors.black,
    fontSize: 18,
    margin: 10,
    flexWrap: "wrap",
  },
});

export const HeaderFotosLista = (navData: any) => {
  return {
    title: "Fotos",
    headerRight: () => {
      return (
        <Ionicons
          name="ios-arrow-back"
          size={28}
          color={Colors.white}
          style={{ marginHorizontal: 20 }}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      );
    },
    headerLeft:()=>(
      <HeaderLeft navData={navData}/>
    ),
  };
};


export default FotosLista;