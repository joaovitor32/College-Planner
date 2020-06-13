import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../colors/colors";
import { Entypo } from "@expo/vector-icons";

interface Props {
  title: string;
  key: number;
  id: number;
}

const DisplayMateria: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={style.containerFolder}>
      <Entypo
        onPress={() => {
          navigation.navigate("ListaFotosSelecionadas", {
            id: props.id,
            title: props.title,
          });
        }}
        name="folder"
        size={80}
        color="black"
      />
      <Text style={style.title}>{props.title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  containerFolder: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height * 0.025,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DisplayMateria;
