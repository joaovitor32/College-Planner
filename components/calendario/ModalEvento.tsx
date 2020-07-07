import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  FlatList,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";
import { Colors } from "../../colors/colors";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as CalendarioAction from "../../store/actions/Eventos";

interface Props {
  display: boolean;
  toogle: (state: boolean) => void;
  date: Date;
}

interface evento {
  evento: string;
  validyEvento: boolean;
}

interface state {
  eventos: {
    items: {
      idEvento: number;
      evento: string;
      created_at: string;
    }[];
  };
}

interface PropsEvento{
  evento:string,
}

const DisplayEvent:React.FC<PropsEvento> = (props) => {
  return (
    <View style={styles.boxEventText}>
      <Text style={styles.eventText}>{props.evento}</Text>
    </View>
  );
};

const ModalEvento: React.FC<Props> = (props) => {
  const { display, toogle, date } = props;
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [dados, setDados] = useState<evento>({
    evento: "",
    validyEvento: false,
  } as evento);

  const handlePress = () => setExpanded(!expanded);
  const dateFormatted = [
    date.getDate() + 1,
    date.getMonth() + 1,
    date.getFullYear(),
  ].join("/");

  const eventos = useSelector((state: state) =>
    state.eventos.items.filter((el) => el.created_at == dateFormatted)
  );

  const inputHandlerEvento = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const element = e.nativeEvent.text;
    let validyEvento = true;

    if (element.length == 0) {
      validyEvento = false;
    }

    setDados({ evento: element, validyEvento: validyEvento });
  };

  const submitHandler = () => {
    if (dados.validyEvento) {
      dispatch(CalendarioAction.addEvento(dados.evento, date));
      setDados({ evento: "", validyEvento: false });
    } else {
      Alert.alert(
        "Algum dado inserido está incorreto!",
        "Por favor, reveja os campos!"
      );
      return;
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={() => {
          toogle(!display);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <List.Section
              titleStyle={{ color: Colors.white }}
              title={dateFormatted}
            >
              <List.Accordion
                titleStyle={{ color: Colors.white }}
                title="Cadastro de Evento"
                left={(props) => (
                  <List.Icon color={Colors.white} icon="folder" />
                )}
              >
                <View style={styles.boxCadastroEvento}>
                  <Text style={styles.textEvento}>Evento: </Text>
                  <TextInput
                    value={dados.evento}
                    style={styles.input}
                    placeholder="Evento do dia..."
                    onChange={inputHandlerEvento}
                  />
                </View>
                <TouchableOpacity style={styles.btnCadEvento}>
                  <Text
                    onPress={() => {
                      submitHandler();
                    }}
                    style={styles.textEvento}
                  >
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </List.Accordion>

              <List.Accordion
                title="Eventos do Dia"
                titleStyle={{ color: Colors.white }}
                left={(props) => (
                  <List.Icon color={Colors.white} icon="calendar" />
                )}
                expanded={expanded}
                onPress={handlePress}
              >
                {eventos.length == 0 ? (
                  <View style={styles.boxNocontent}>
                    <Text style={styles.TextNocontent}>
                      Este dia não tem eventos!
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={eventos}
                    renderItem={({ item }) => <DisplayEvent evento={item.evento} />}
                    keyExtractor={(item) => String(item.idEvento)}
                  />
                )}
              </List.Accordion>
            </List.Section>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.blackLinear,
  },
  modalView: {
    backgroundColor: Colors.blackLinearDarker,
    width: "90%",
    height: "75%",
    marginVertical: "12.5%",
    marginHorizontal:'5%'
  },
  image: {
    width: "100%",
    height: "100%",
  },
  boxCadastroEvento: {
    flexDirection: "row",
    padding: 15,
    textAlign: "center",
    alignItems: "center",
  },
  textEvento: {
    color: Colors.white,
  },
  input: {
    color: Colors.white,
    marginHorizontal: 10,
  },
  btnCadEvento: {
    width: "60%",
    padding: "2%",
    marginHorizontal: "20%",
    backgroundColor: Colors.darkGray,
  },
  boxNocontent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  TextNocontent: {
    color: Colors.white,
  },
  boxEventText:{
    paddingVertical:15,
  },
  eventText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15,
  }
});

export default ModalEvento;
