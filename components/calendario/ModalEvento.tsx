import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Button,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Colors } from "../../colors/colors";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  display: boolean;
  toogle: (state: boolean) => void;
  date: Date;
}

interface evento {
  evento: string;
  validyEvento: boolean;
}

const ModalEvento: React.FC<Props> = (props) => {
  const { display, toogle, date } = props;
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

  const inputHandlerEvento = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
      const element=e.nativeEvent.text;
      let  validyEvento=true;

      if(element.length==0){
        validyEvento=false;
      }

      setDados({evento:element,validyEvento:validyEvento})
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
                    style={styles.input}
                    placeholder="Evento do dia..."
                    onChange={inputHandlerEvento}
                  />
                </View>
                <TouchableOpacity style={styles.btnCadEvento}>
                    <Text style={styles.textEvento}>Cadastrar</Text>
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
                <Text>Accordion</Text>
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
    height: "90%",
    margin: "5%",
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
      color:Colors.white,
  },
  input: {
    color:Colors.white,
    marginHorizontal: 10,
  },
  btnCadEvento:{
    width:'60%',
    padding:'2%',
    marginHorizontal:'20%',
    backgroundColor:Colors.darkGray
  }
});

export default ModalEvento;
