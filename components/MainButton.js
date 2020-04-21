import React from 'react';
import { StyleSheet, TouchableOpacity,View,Text,TouchableNativeFeedback } from 'react-native';
import Colors from '../Constants/colors'
import { Platform } from '@unimodules/core';

const MainButton = props => {
    let ButtonComponent=TouchableOpacity
    if(Platform.OS==='android' && Platform.Version>21){
        ButtonComponent=TouchableNativeFeedback
    }
    return (
        <ButtonComponent activeOpacity={0.7} onPress={props.onClicked}>
            <View style={styles.button}> 
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </ButtonComponent>
    )
}

const styles = StyleSheet.create({
    button: {
       paddingHorizontal:20,
       paddingVertical:12,
       backgroundColor:Colors.primary,
       borderRadius:25
    },
    buttonText: {
        fontSize: 18,
        color:'white'
    }
})
export default MainButton