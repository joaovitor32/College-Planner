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
import { useSelector } from "react-redux";

interface Props {
  display: boolean;
  toogle: (state: boolean) => void;
  id: number;
}

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

const ModalGallery: React.FC<Props> = (props) => {


  const fotos = useSelector((state: state) => state.fotos.items);
  const { display, toogle, id } = props;

  const mapIndex = fotos.map((item) => {return item.idFoto});
  const [passId, setPassId] = useState(mapIndex.indexOf(id));

  let fotoObject = fotos.find((foto) => foto.idFoto == mapIndex[passId]);

  const orientation = useCallback(async () => {
    if (display) {
      await ScreenOrientation.unlockAsync();
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  }, [display, ScreenOrientation]);

  useEffect(() => {
    orientation();
  }, [orientation]);


  const newFotoObject=(index:number)=>{
    if(mapIndex[index]){
      setPassId(index);
    }
  }

  let panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
      //console.log("x:"+gestureState.x0,"y:"+gestureState.y0)
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
    },
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      let newIndex
      switch (Math.sign(gestureState.dx)) {
        case -1:
          newIndex=passId+1
          newFotoObject(newIndex)
          break;
        case +1:
          newIndex=passId-1
          newFotoObject(newIndex);
          break;
        default:
          break;
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  return (
    <View {...panResponder.panHandlers} style={styles.centeredView}>
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
            <Image
              style={styles.image}
              source={{ uri: fotoObject?.imageUri }}
            />
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
