import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import LinearGradientBox from "../../components/LinearGradientBox";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as FotoAction from "../../store/actions/Fotos";
import FotoElement from "../../components/fotos/FotoElement";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { YellowBox } from 'react-native';


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
  const [isLoading, setIsLoading] = useState(false);
  const fotos = useSelector((state: state) => state.fotos.items)

  const loadFotosList = useCallback(async () => {
    try {
      await dispatch(FotoAction.loadFotos(id));
    } catch (err) {
      Alert.alert(err);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadFotosList().then(() => {
        setIsLoading(false);
      });
    }, [loadFotosList])
  );

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);


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
            renderItem={({ item, index }) => (
              <FotoElement
                created_at={item.created_at}
                imageUri={item.imageUri}
                id={item.idFoto}
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
