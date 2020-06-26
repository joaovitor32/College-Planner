/*---Search how to make multiple handle text inputs better-----*/

import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../colors/colors";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";

const CHECK_INPUTS = "CHECK_INPUTS";

interface materiaData {
  title: string;
  periodo: string;
  description: string;
}

interface validityInputs {
  title: boolean;
  periodo: boolean;
  description: boolean;
}

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

const CadastroMateria: React.FC = ({ navigation, route }: any) => {
  const { id, type } = route.params;
  const [dados, setDados] = useState<materiaData>({} as materiaData);
  const [validity, setValidity] = useState<validityInputs>(
    {} as validityInputs
  );

  const dispatch = useDispatch();
  const materiaObject = useSelector((state: state) =>
    state.materias.items.find((mat) => mat.id == id)
  );

  useEffect(() => {
    switch (type) {
      case "EditarMateria":
        if (materiaObject) {
          setDados({
            title: materiaObject.title,
            periodo: materiaObject.periodo,
            description: materiaObject.description,
          } as materiaData);
          setValidity({
            title: true,
            periodo: true,
            description: true,
          } as validityInputs);
        }
        return;
    }
  }, [type, materiaObject]);

  const inputHandlerTitle = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const element = e.nativeEvent.text;
    let elementValidity = true;

    if (element.length == 0) {
      elementValidity = false;
    }

    setDados((dados: materiaData) => ({ ...dados, title: element }));
    setValidity((validity: validityInputs) => ({
      ...validity,
      title: elementValidity,
    }));
  };

  const inputHandlerDescricao = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const element = e.nativeEvent.text;
    let elementValidity = true;

    if (element.length == 0) {
      elementValidity = false;
    }

    setDados((dados: materiaData) => ({ ...dados, description: element }));
    setValidity((validity: validityInputs) => ({
      ...validity,
      description: elementValidity,
    }));
  };

  const inputHandlerPeriodo = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const periodoRegex = "[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}.[1-2]{1}";
    const element = e.nativeEvent.text;

    let elementValidity = true;
    if (!element.match(periodoRegex)) {
      elementValidity = false;
    }

    setDados((dados: materiaData) => ({ ...dados, periodo: element }));
    setValidity((validity: validityInputs) => ({
      ...validity,
      periodo: elementValidity,
    }));
  };

  const submitMateria = () => {
    if (validity.title && validity.periodo && validity.description) {
      try {
        switch (type) {
          case "CadastraMateria":
            dispatch(
              MateriasAction.addMateria(
                dados.title,
                dados.periodo,
                dados.description
              )
            );
            break;
          case "EditarMateria":
            dispatch(
              MateriasAction.editMateria(
                id,
                dados.title,
                dados.periodo,
                dados.description
              )
            );
            break;
        }
        navigation.goBack();
      } catch (err) {
        Alert.alert(err);
      }
    } else {
      Alert.alert(
        "Algum dado inserido está incorreto!",
        "Por favor, reveja os campos!"
      );
    }
  };

  return (
    <LinearGradientBox>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.form}>
          <View style={styles.containerForm}>
            <View style={styles.container}>
              <TextInput
                placeholderTextColor={Colors.white}
                placeholder="Título"
                style={styles.input}
                onChange={inputHandlerTitle}
                value={dados.title}
                returnKeyType="done"
              />
            </View>
            <View style={styles.container}>
              <TextInput
                placeholderTextColor={Colors.white}
                placeholder="Período"
                onChange={inputHandlerPeriodo}
                style={styles.input}
                value={dados.periodo}
                returnKeyType="done"
              />
            </View>
            <View style={styles.container}>
              <TextInput
                placeholderTextColor={Colors.white}
                placeholder="Descrição"
                onChange={inputHandlerDescricao}
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                value={dados.description}
                returnKeyType="done"
              />
            </View>
            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text onPress={submitMateria} style={styles.titleButton}>
                  {!id ? "Cadastrar" : "Editar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  containerForm: {
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 8,
    marginHorizontal: 5,
    color: Colors.white,
  },
  input: {
    borderBottomColor: Colors.white,
    color: Colors.white,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: Dimensions.get("window").width - 100,
  },
  button: {
    backgroundColor: Colors.whiteTransparent,
    borderColor: Colors.blackLinear,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  titleButton: {
    color: Colors.blackLinear,
    fontSize: 16,
    fontFamily: "Ubuntu_400Regular",
  },
});

export const materiaCadastroScreen = (navData: any) => {
  return {
    title: "Cadastro de Matéria",
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
  };
};

export default CadastroMateria;
