import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  Modal,
  PanResponder,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";


interface Props {
  display: boolean;
  toogle: (state: boolean) => void
}


const ModalEmail: React.FC<Props> = (props) => {
  
    const { display, toogle} = props;

 

  

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={() => {
          toogle(!display);
        }}
      >
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ModalEmail;
