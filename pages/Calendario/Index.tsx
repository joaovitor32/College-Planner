import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { Colors } from "../../colors/colors";
import LinearGradientBox from "../../components/LinearGradientBox";
import { Calendar } from "react-native-calendars";
import ModalEvento from "../../components/calendario/ModalEvento";
import { colors } from "react-native-elements";
import { LocaleConfig } from "react-native-calendars";

const CalendarioLista: React.FC = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const toogleModal = (date: Date) => {
    setDate(date);
    setModalVisible(!modalVisible);
  };

  LocaleConfig.locales["pt"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul.",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Mar.", "Qua.", "Qui.", "Sex.", "Sab."],
    
  };
  LocaleConfig.defaultLocale = "pt";

  return (
    <LinearGradientBox>
      <ModalEvento
        display={modalVisible}
        toogle={setModalVisible}
        date={date}
      />
      <Calendar
        style={{ height: "100%", width: "100%" }}
        /*markedDates={{
          '2020-10-25': {dots: [vacation], selected: true},
          '2020-10-26': {dots: [vacation], selected: true}
        }}*/
        dayComponent={({ date, state, marking }) => {
          return (
            <View>
              <Text
                style={{
                  color: state === "disabled" ? "gray" : "black",
                  padding: 15,
                }}
                onPress={() => {
                  toogleModal(new Date(date.dateString));
                }}
              >
                {date.day}
              </Text>
            </View>
          );
        }}
      />
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({});

export const calendarioIndexScreen = (navData: any) => {
  return {
    title: "Eventos",
    headerRight: () => {
      return (
        <Ionicons
          name="ios-arrow-back"
          size={28}
          color={Colors.white}
          style={{ marginHorizontal: 20 }}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      );
    },
  };
};

export default CalendarioLista;
