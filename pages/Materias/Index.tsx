import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../colors/colors";
import LinearGradientBox from "../../components/LinearGradientBox";

import { useSelector, useDispatch } from "react-redux";
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
  const materias = useSelector((state: state) => state.materias.items);

  const [isLoading, setIsLoading] = useState(false);

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
  }, [loadMaterias]);

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
              navigation.navigate("MateriaNova", {
                type: "CadastraMateria",
                id: null,
              });
            }}
          />
        );
      },
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={80} color={Colors.black} />
        </View>
      ) : materias.length != 0 ? (
        materias.map((element, index) => (
          <DisplayMateria key={element.id} id={element.id} title={element.title} />
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

export default MateriasLista;
