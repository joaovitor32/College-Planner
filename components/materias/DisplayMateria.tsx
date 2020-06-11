import React, { useEffect} from "react";
import { StyleSheet, Text, View,FlatList } from "react-native";

interface  Props{
    title:string,
    periodo:string,
    description:string,
}

const DisplayMateria: React.FC<Props> = (props) => {
    return (
        <View >
            <Text>
                {props.title}
                {props.periodo}
                {props.description}
            </Text>
        </View>
    )
}

const style=StyleSheet.create({

})

export default DisplayMateria;
