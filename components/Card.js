import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card,...props.style}}>{props.children}</View>//"...(spread operator)- merges 'styles' card and 'style'. Also it will override some properties of 'card' object from 'style' object, if same attributes passed through 'style object'"
    );
}

const styles = StyleSheet.create({
    card: {
        // width: 300,
        // maxWidth: '80%',
        // alignItems: "center", //These attributes will be added dynamically
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.26,
        elevation: 6,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
});

export default Card;