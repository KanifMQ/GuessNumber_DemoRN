import React from 'react';
import { View,Text, StyleSheet,Platform } from 'react-native';
import Colors from '../Constants/colors'

const Header = props => {
   return (
        <View style={{...styles.headerBase, ...Platform.select({ios:styles.headeriOS, android:styles.headerAndroid})}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 36
    },
    headeriOS: {
        backgroundColor: Colors.primary
    },
    headerAndroid: {
        backgroundColor: 'grey'
    },
    headerTitle: {
        color:  'white',
        fontSize: 16,
    }
});
export default Header;
