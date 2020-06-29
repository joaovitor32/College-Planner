import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
//import * as Contacts from "expo-contacts"
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  display: boolean;
  toogle: (state: boolean) => void;
  fotos: Array<string>;
  //type: string;
}

/*interface Contact {
  id: string;
  name: string;
  phoneNumber?: [];
}*/

/*const Item = (props: any) => {
  const { item, sendPhone } = props;

  let numberPhone = item.phoneNumbers ? item.phoneNumbers[0].number : null;

  return (
    <TouchableOpacity>
      <Text
        onPress={() => {
          sendPhone(numberPhone);
        }}
        style={styles.textContact}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};*/

const ModalShare: React.FC<Props> = (props) => {
  const { display, toogle, fotos} = props;
  const [email, setEmail] = useState("");
  //const [contacts, setContacts] = useState<Contact[]>([]);
  //const [isLoading, setIsLoading] = useState(false);

  /*const requestContacts = useCallback(async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.RawImage,
            Contacts.Fields.Image,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.ImageAvailable,
            Contacts.PHONE_NUMBERS,
            Contacts.IMAGE,
            Contacts.RAW_IMAGE,
          ],
        });
        setContacts(data);
      }
    } catch (err) {}
  }, []);*/

  /*useEffect(() => {
    setIsLoading(true);
    requestContacts().then(() => {
      setIsLoading(false);
    });
  }, [requestContacts, display]);*/

  const inputHandlerEmail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const element = e.nativeEvent.text;
    setEmail(element);
  };

  const checkArrayFotos = (fotos: Array<string>) => {
    if (!fotos) {
      Alert.alert("Nenhuma foto foi selecionada!");
      return;
    }
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

    checkArrayFotos(fotos);

    MailComposer.composeAsync({
      subject: "Mandando fotos de matéria",
      recipients: [email],
      attachments: fotos,
    }).then(() => {
      setEmail("");
    });
  };

  const handlePhone = (number: string) => {
    checkArrayFotos(fotos);
    Linking.openURL(
      `whatsapp://send?phone=${number}&text=Mandando fotos das matérias`
    );
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
        <View style={[styles.modalViewEmail, styles.modalView]}>
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
        {/*type == "phone" &&
          (!isLoading ? (
            <View style={[styles.modalView, styles.modalViewPhone]}>
              <FlatList
                data={contacts}
                renderItem={({ item }) => (
                  <Item sendPhone={handlePhone} item={item} />
                )}
                keyExtractor={(item) => String(item.id)}
                initialNumToRender={10}
              />
            </View>
          ) : (
            <View style={[styles.modalView, styles.modalViewPhone]}>
              <View style={styles.container}>
                <ActivityIndicator size={80} color={Colors.white} />
              </View>
            </View>
          ))*/}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
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
  textContact: {
    color: Colors.white,
    marginVertical: Dimensions.get("screen").height * 0.01,
    fontSize: Dimensions.get("screen").height * 0.03,
  },
});
export default ModalShare;
