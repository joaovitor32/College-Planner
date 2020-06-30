import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { Colors } from "../../colors/colors";
import LinearGradientBox from "../../components/LinearGradientBox";
import { Calendar } from "react-native-calendars";

const CalendarioLista: React.FC = ({ navigation }: any) => {
  const vacation = { key: "evento", color: "red", selectedDotColor: "blue" };

  return (
    <LinearGradientBox>
      <Calendar
        style={{ height: "100%", width: "100%" }}
        /*markedDates={{
          '2020-10-25': {dots: [vacation], selected: true},
          '2020-10-26': {dots: [vacation], selected: true}
        }}*/
        markingType={'multi-dot'}
        dayComponent={({ date, state, marking }) => {
          return (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: state === "disabled" ? "gray" : "black",
                }}
                onPress={() => {
                  console.log(marking);
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
