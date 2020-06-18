import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as FotoAction from "../../store/actions/Fotos";
import ModalGallery from "../../components/fotos/ModalGallery";
import * as ScreenOrientation from "expo-screen-orientation";

interface Props {
  id: number;
  imageUri: string;
  created_at: Date;
}

const FotoElement: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { id, imageUri, created_at } = props;

  const deleteFoto = (id: number, imageUri: string) => {
    dispatch(FotoAction.deletefoto(id, imageUri));
  };

  const toogleModal = async () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <ModalGallery
        display={modalVisible}
        toogle={toogleModal}
        imageUri={imageUri}
      />
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => {
            toogleModal();
          }}
        >
          <Image style={styles.imageStyle} source={{ uri: imageUri }} />
        </TouchableOpacity>
        <View style={styles.boxContent}>
          <Text style={styles.dateText}>{created_at}</Text>
          <TouchableOpacity
            style={styles.tchDelete}
            onPress={() => {
              deleteFoto(id, imageUri);
            }}
          >
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ccc",
    borderColor: Colors.black,
    borderWidth: 1,
  },
  boxContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tchDelete: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 20,
    marginHorizontal: "2%",
  },
  dateText: {
    color: Colors.white,
    marginHorizontal: "5%",
    fontSize: 18,
    fontFamily: "Ubuntu_400Regular",
  },
  box: {
    flexDirection: "row",
    backgroundColor: Colors.blackLinear,
    width: "90%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default FotoElement;
