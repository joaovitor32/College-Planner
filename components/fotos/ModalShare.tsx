import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  Modal,
  PanResponder,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import * as Contacts from 'expo-contacts';

interface Props {
  display: boolean;
  toogle: (state: boolean) => void;
  fotos: Array<string>;
  type: string;
}

const ModalShare: React.FC<Props> = (props) => {
  const { display, toogle, fotos, type } = props;
  const [email, setEmail] = useState("");
  const [contacts,setContacts]=useState({})

  const requestContacts=async() => {
        const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.RawImage,Contacts.Fields.Image,Contacts.Fields.PhoneNumbers,Contacts.Fields.ImageAvailable],
        });

        setContacts(data);
      }
    }


  const inputHandlerEmail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const element = e.nativeEvent.text;
    setEmail(element);
  };

  const sendMail = () => {
    const periodoRegex =
      "[a-z0-9._%+!$&*=^|~#%'`?{}-]+@([a-z0-9-]+.){1,}([a-z]{2,16})";

    if (!email.match(periodoRegex)) {
      Alert.alert(
        "Algum dado inserido está incorreto!",
        "Por favor, reveja os campos!"
      );
      return;
    }
    if (!fotos) {
      Alert.alert("Nenhuma foto foi selecionada!");
      return;
    }

    MailComposer.composeAsync({
      subject: "Mandando fotos de matéria",
      recipients: [email],
      attachments: fotos,
    }).then(() => {
      setEmail("");
    });
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
        {type == "email" && (
          <View style={[styles.modalViewEmail,styles.modalView]}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View style={styles.boxInputs}>
                <Text style={styles.textInput}>Email:</Text>
                <TextInput
                  style={styles.input}
                  onChange={inputHandlerEmail}
                  placeholderTextColor={Colors.white}
                  multiline={true}
                  numberOfLines={4}
                  returnKeyType="done"
                />
              </View>
              <View style={styles.boxButton}>
                <AntDesign
                  onPress={() => {
                    sendMail();
                  }}
                  name="check"
                  size={30}
                  color={Colors.white}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        )}
        {type == "phone" && (
          <View style={[styles.modalView,styles.modalViewPhone]}>
            <Text>Zap</Text>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    height: "100%",

    alignItems: "center",
    textAlign: "center",
  },
  modalView: {
    width: "90%",
    marginHorizontal: "4%",
    marginTop: Dimensions.get("screen").height * 0.125,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.blackLinearDarker,
  },
  modalViewEmail: {
    height: Dimensions.get("screen").height * 0.25,
  },
  boxInputs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
  },
  textInput: {
    color: Colors.white,
  },
  boxButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 20,
  },
  modalViewPhone: {
    height: Dimensions.get("screen").height * 0.7,
  },
  input: {
    color: Colors.white,
    paddingHorizontal: 5,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    height: 40,
    width: "80%",
  },
});
export default ModalShare;
