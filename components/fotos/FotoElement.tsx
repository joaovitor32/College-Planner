import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  CheckBox,
} from "react-native";
import { Foto } from "../../models/Fotos";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as FotoAction from "../../store/actions/Fotos";
import ModalGallery from "../../components/fotos/ModalGallery";
import * as ScreenOrientation from "expo-screen-orientation";
import { FadeInView } from "../Animation/FadeInView";

interface state {
  fotos: {
    items: {
      idFoto: number;
      idMateria: number;
      imageUri: string;
      created_at: Date;
    }[];
  };
}

interface Props {
  id: number;
  created_at: Date;
  isSelected: boolean;
  pickImage: (arg: any) => void;
  selectedImages: Array<string>;
}

const FotoElement: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { id, created_at, isSelected, pickImage, selectedImages } = props;
  const [isMarked, setMarked] = useState(false);

  const deleteFoto = (id: number, imageUri: string) => {
    dispatch(FotoAction.deletefoto(id, imageUri));
  };

  const fotoObject = useSelector((state: state) =>
    state.fotos.items.find((foto) => foto.idFoto == id)
  );

  const toogleModal = async () => {
    setModalVisible(!modalVisible);
  };

  const handleMarker = () => {
    setMarked((state: boolean) => !state);
   
    let choseUri=fotoObject?.imageUri;

    const alreadySelected = selectedImages.includes(String(choseUri));
 
    if(alreadySelected){
      const filteredItems = selectedImages.filter(item => item != choseUri);
      pickImage(filteredItems);  
    }else{
      pickImage((selectedImages:Array<string>)=>[...selectedImages, choseUri])
    }

  };

  return (
    <>
      <ModalGallery display={modalVisible} toogle={toogleModal} id={id} />
      <View style={styles.box}>
        {isSelected && (
          <FadeInView isSelected={isSelected}>
            <CheckBox
              value={isMarked}
              onValueChange={() => {
                handleMarker();
              }}
            />
          </FadeInView>
        )}
        <TouchableOpacity
          onPress={() => {
            toogleModal();
          }}
        >
          <Image
            style={styles.imageStyle}
            source={{ uri: fotoObject?.imageUri }}
          />
        </TouchableOpacity>

        <View style={styles.boxContent}>
          <Text style={styles.dateText}>{created_at}</Text>
          <TouchableOpacity
            style={styles.tchDelete}
            onPress={() => {
              deleteFoto(id, fotoObject ? fotoObject.imageUri : "");
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
    marginHorizontal: "1%",
  },
  dateText: {
    color: Colors.white,
    marginHorizontal: "2.5%",
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
