import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator, InteractionManager ,Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../colors/colors";
import LinearGradientBox from "../../components/LinearGradientBox";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";
import DisplayMateria from "../../components/materias/DisplayMateria";

interface state {
  materias: {
    items: {
      id: number;
      title: string;
      periodo: string;
      description: string;
    }[];
  };
}

const MateriasLista: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const materias = useSelector((state: state) => state.materias.items,shallowEqual);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const loadMaterias = useCallback(async () => {
    try {
      await dispatch(MateriasAction.loadMaterias());
    } catch (err) {
      Alert.alert(err);
    }
  }, [dispatch]);


  useEffect(() => {
    if (isFocused) {
      loadMaterias().then(() => {
        setIsLoading(false);
      });
    }else{
      setIsLoading(true);
    }
  }, [loadMaterias, isFocused]);

  return (
    <LinearGradientBox>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={80} color={Colors.black} />
        </View>
      ) : materias.length != 0 ? (
        materias.map((element, index) => (
          <DisplayMateria key={index}  id={element.id} title={element.title} />
        ))
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
  },
  boxText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textStyles: {
    fontSize: 30,
    fontFamily: "Ubuntu_400Regular",
  },
  textNoContent: {
    fontFamily: "Ubuntu_400Regular",
    color: Colors.black,
    fontSize: 18,
    margin: 10,
    flexWrap: "wrap",
  },
});

export const materiaIndexScreen = (navData:any) => {
  return {
    title: "Matérias",
    headerRight: () => {
      return (
        <AntDesign
          style={{ marginHorizontal: 10 }}
          name="plus"
          size={28}
          color={Colors.white}
          onPress={() => {
            navData.navigation.navigate("Materias", {
              screen: "MateriaNova",
              params: {
                type: "CadastraMateria",
                id: null,
              },
            });
          }}
        />
      );
    },
  };
};

export default MateriasLista;