import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import * as MateriasAction from "../../store/actions/Materia";
import { Colors } from "../../colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as FotoAction from "../../store/actions/Fotos";
import FotoElement from "../../components/fotos/FotoElement";
import { FlatList } from "react-native-gesture-handler";

interface state {
  fotos: {
    items: {
      idFoto: number;
      idMateria: number;
      imageUri: string;
      created_at:Date
    }[];
  };
}

const ListaFotosSelecionadas: React.FC = ({ navigation, route }: any) => {
  const { id, title } = route.params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fotos = useSelector((state: state) => state.fotos.items);

  const loadFotosList = useCallback(async () => {
    try {
      await dispatch(FotoAction.loadFotos(id));
    } catch (err) {
      Alert.alert(err);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadFotosList().then(() => {
      setIsLoading(false);
    });
  }, [loadFotosList]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
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
                navigation.navigate("FotosLista");
              }}
            />
            <AntDesign
              name="plus"
              size={28}
              color={Colors.white}
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                navigation.navigate("CadastrarFoto", {
                  id: id,
                });
              }}
            />
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <LinearGradientBox>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={80} color={Colors.black} />
        </View>
      ) : fotos.length != 0 ? (
        <View style={styles.boxFlatlist}>
          <FlatList
            data={fotos}
            renderItem={({ item }) => (
              console.log(item.created_at),
              <FotoElement  key={String(item.idFoto)} created_at={item.created_at} imageUri={item.imageUri} id={item.idFoto} image={item.imageUri} />
            )}
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
  boxFlatlist:{
    height:"100%",
    width:"100%",
    marginHorizontal:"4%",
    marginVertical:"4%"
  }
});

export default ListaFotosSelecionadas;
