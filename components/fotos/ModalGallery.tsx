import React, { useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Alert, Image, Modal } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

interface Props {
  display: boolean;
  imageUri: string;
  toogle: (state: boolean) => void;
}

const ModalGallery: React.FC<Props> = (props) => {
  
  const {display,imageUri,toogle} = props;
  
  const orientation = useCallback(async () => {
    if (display) {
      await ScreenOrientation.unlockAsync();
    }else{
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [display,ScreenOrientation]);

  useEffect(() => {
    orientation();
  }, [orientation]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={() => {
          toogle(!display);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.image} source={{ uri:imageUri }} />
          </View>
        </View>
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

export default ModalGallery;
