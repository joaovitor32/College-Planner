import React from "react";
import { Colors } from "../../colors/colors";
import { MaterialIcons } from '@expo/vector-icons'; 

interface Props{
    navData:any;
}

const HeaderLeft: React.FC<Props> = (props) => {

    const {navData} =props;

    return (
        <MaterialIcons 
        name="menu" 
        size={28} 
        color={Colors.white} 
        style={{ marginHorizontal:15,}}
        onPress={()=>{
            navData.navigation.toggleDrawer()   
        }}
    />    
    )
};

export default HeaderLeft;
