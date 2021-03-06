import React, { useRef, useEffect } from "react";
import { Animated, Text, View } from "react-native";

export const FadeInView = (props: any) => {
  const { isSelected } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const marginAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let time=300;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: time,
    }).start();
    Animated.timing(marginAnim, {
      toValue: 1,
      duration: time,
    }).start();
  }, [isSelected]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
        marginLeft: marginAnim
      }}
    >
      {props.children}
    </Animated.View>
  );
};
