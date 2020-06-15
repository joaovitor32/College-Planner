import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as FotoAction from "../../store/actions/Fotos";

interface Props {
  image: string;
  id: number;
  imageUri: string;
  created_at:Date
}

const FotoElement: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const deleteFoto = (id: number, imageUri: string) => {
    dispatch(FotoAction.deletefoto(id, imageUri));
  };

  return (
    <View style={styles.box}>
      <Image style={styles.imageStyle} source={{ uri: props.image }} />
      <View style={styles.boxContent}>
        <Text>{props.created_at}</Text>
        <TouchableOpacity
          style={styles.tchDelete}
          onPress={() => {
            deleteFoto(props.id, props.imageUri);
          }}
        >
          <AntDesign name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: "5%",
  },
  tchDelete: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 20,
  },
  box: {
    flexDirection: "row",
    marginVertical: "2%",
  },
});

export default FotoElement;
