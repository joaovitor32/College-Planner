import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  CheckBox,
} from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import * as FotoAction from "../../store/actions/Fotos";
import FotoElement from "../../components/fotos/FotoElement";
import ModalShare from '../../components/fotos/ModalShare';
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { YellowBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

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

const ListaFotosSelecionadas: React.FC = ({ navigation, route }: any) => {
  const { id } = route.params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const fotos = useSelector((state: state) => state.fotos.items);
  const [isSelected, setSelection] = useState(false);
  const [selectedImages,setSelectedImages]=useState<Array<string>>([])
  const [type,setType]=useState('');

  const toogleModal = async (type:string) => {
    setType(type);
    handleModal();
  };

  const handleModal=()=>{
    setModalVisible(!modalVisible);
  }

  const loadFotosList = async () => {
    try {
      await dispatch(FotoAction.loadFotos(id));
    } catch (err) {
      Alert.alert(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFotosList().then(() => {
        setIsLoading(false);
      });
    }, [loadFotosList])
  );

  YellowBox.ignoreWarnings([
    "Non-serializable values were found in the navigation state",
  ]);

  return (
    <LinearGradientBox>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={80} color={Colors.black} />
        </View>
      ) : fotos.length != 0 ? (
        <View style={styles.boxFlatlist}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxContainerLeft}>
              <CheckBox
                value={isSelected}
                onValueChange={() => {
                  setSelection((state) => !state);
                }}
              />
              <Text style={{ fontWeight: "bold" }}>Compartilhar fotos</Text>
            </View>
            <ModalShare type={type} fotos={selectedImages} display={modalVisible} toogle={handleModal}  />
            {isSelected&&
              <View style={styles.checkboxContainerRight}>
                <Ionicons  name="logo-whatsapp" onPress={()=>{toogleModal('phone')}} size={30} color={"#4AC959"} />
                <MaterialCommunityIcons onPress={()=>{toogleModal('email')}} name="email" size={30} color={'#c1392b'} />
              </View>
            }
          </View>
          <FlatList
            data={fotos}
            renderItem={({ item, index }) => (
              <FotoElement
                isSelected={isSelected}
                created_at={item.created_at}
                id={item.idFoto}
                pickImage={setSelectedImages}
                selectedImages={selectedImages}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={styles.boxText}>
          <Text style={styles.textNoContent}>
            Essa matéria não tem fotos associadas
          </Text>
        </View>
      )}
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  containerHeaderRight: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  boxText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textNoContent: {
    fontFamily: "Ubuntu_400Regular",
    color: Colors.black,
    fontSize: 18,
    margin: 10,
    flexWrap: "wrap",
  },
  boxFlatlist: {
    height: "100%",
    width: "100%",
    marginHorizontal: "4%",
    marginVertical: "4%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent:"space-between",
    width:"90%",
    marginVertical:5
  },
  checkboxContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainerRight: {
    flexDirection:'row',
    justifyContent:'space-around',
    width:'25%'
  },
});

export const HeaderFotosListaSelecionadas = (navData: any) => {
  const { title, id } = navData.route.params;

  return {
    title: `Fotos de ${title}`,
    headerRight: () => {
      return (
        <View style={styles.containerHeaderRight}>
          <Ionicons
            name="ios-arrow-back"
            size={28}
            color={Colors.white}
            style={{ marginHorizontal: 5 }}
            onPress={() => {
              navData.navigation.goBack();
            }}
          />
          <AntDesign
            name="plus"
            size={28}
            color={Colors.white}
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              navData.navigation.navigate("Fotos", {
                screen: "CadastrarFoto",
                params: {
                  id: id,
                },
              });
            }}
          />
        </View>
      );
    },
  };
};

export default ListaFotosSelecionadas;
