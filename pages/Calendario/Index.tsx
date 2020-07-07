import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../colors/colors";
import LinearGradientBox from "../../components/LinearGradientBox";
import { Calendar } from "react-native-calendars";
import ModalEvento from "../../components/calendario/ModalEvento";
import { useSelector, useDispatch } from "react-redux";
import { LocaleConfig } from "react-native-calendars";
import * as CalendarioAction from "../../store/actions/Eventos";

interface state {
  eventos: {
    items: {
      idEvento: number;
      evento: string;
      created_at: string;
    }[];
  };
}

const CalendarioLista: React.FC = ({ navigation }: any) => {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [markedEvents, setMarkedEvents] = useState<{}>({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const toogleModal = (date: Date) => {
    setDate(date);
    setModalVisible(!modalVisible);
  };

  const eventos = useSelector((state: state) => state.eventos.items);

  const getSelectedEvents = () => {
    let selectedEvents: any = {};
    if (eventos.length != 0) {
      eventos.forEach((elem) => {
        let tranformDate = elem.created_at.split("/");
        let date = [tranformDate[2], tranformDate[1], tranformDate[0]].join(
          "-"
        );
        selectedEvents[date] = {
          selected: true,
          marked: true,
          selectedColor: Colors.blackLinear,
          color: '#00B0BF', textColor: '#FFFFFF'
        };
      });
    }
    setMarkedEvents({ markedDates: selectedEvents });
  };

  const loadEventos = useCallback(async () => {
    try {
      await dispatch(CalendarioAction.loadEventos());
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadEventos().then(() => {
      setIsLoading(false)
    });
  }, [loadEventos]);

  useEffect(()=>{
    getSelectedEvents();
  },[isLoading])

  return (
    <LinearGradientBox>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={80} color={Colors.black} />
        </View>
      ) : (
        <>
          <ModalEvento
            display={modalVisible}
            toogle={setModalVisible}
            date={date}
          />
          <Calendar
            style={{ height: "100%", width: "100%" }}
            markedDates={markedEvents}
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
        </>
      )}
    </LinearGradientBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

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
