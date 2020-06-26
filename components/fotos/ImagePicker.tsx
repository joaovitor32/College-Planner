import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { Colors } from "../../colors/colors";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props{
  chosedImage:(pickedImage: string) =>void,
  cadastrarImagem:() =>void,
}

const ImgPicker: React.FC<Props> = (props) => {
  const [pickedImage, setPickedImage] = useState("");

  const getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== "granted") {
      Alert.alert("Precisamos do acesso a camêra", "Garanta a permissão", [
        { text: "Ok" },
      ]);
      return false;
    }
    return true;
  };
  const takeImagehandler = async () => {
    const permission = await getCameraPermission();
    if (!permission) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImage(result.uri);
      props.chosedImage(result.uri);
    }
  };

  return (
    <LinearGradientBox>
      {pickedImage ? (
        <View>
          <Image style={styles.image} source={{ uri: pickedImage }} />
        </View>
      ) : (
        <View style={styles.containerBox}>
          <Text style={styles.noImage}>No image</Text>
        </View>
      )}
      <View style={styles.containerButton}>
        {pickedImage ? (
          <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.button} onPress={takeImagehandler}>
              <Text style={styles.textButton}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{props.cadastrarImagem()}}>
              <Text style={styles.textButton}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={takeImagehandler}>
            <Text style={styles.textButton}>Foto</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  containerBox: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: Colors.blackLinear,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtons:{
    flexDirection:"row"
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
  },
  noImage: {
    fontSize: 30,
    color: Colors.whiteTransparent,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: Dimensions.get("window").height * 0.1,
  },
  button: {
    backgroundColor: Colors.blackLinear,
    width: Dimensions.get("window").width * 0.25,
    height: Dimensions.get("window").height * 0.07,
    padding: 5,
    marginHorizontal:15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  textButton: {
    fontFamily: "Ubuntu_400Regular",
    color: Colors.whiteTransparent,
  },
});

export default ImgPicker;
