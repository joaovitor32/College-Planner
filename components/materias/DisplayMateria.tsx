import React from "react";
import { ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../colors/colors";
import LinearGradient from "react-native-linear-gradient";

interface Props {
  title: string;
  id:number,
}

const DisplayMateria: React.FC<Props> = (props) => {
  
  const navigation = useNavigation();

  return (
    <ListItem
      title={props.title}
      rightAvatar={
        <AntDesign
          name="caretright"
          onPress={() => {
            navigation.navigate("MateriaNova",{id:props.id,type:"EditarMateria"});
          }}
          size={20}
          color={Colors.whiteTransparent}
        />
      }
      containerStyle={{backgroundColor:Colors.gray}}
      titleStyle={{ color: Colors.whiteTransparent, fontWeight: "bold" }}
      bottomDivider
    />
  );
};

export default DisplayMateria;
