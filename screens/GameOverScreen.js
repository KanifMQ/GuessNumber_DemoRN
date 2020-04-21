import React from 'react';
import { View, StyleSheet, Button, Image, Text, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import colors from '../Constants/colors';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <BodyText>Game is over!!</BodyText>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/success.png')}  // Used for loading image from local.
                        // source={{uri:"https://static.toiimg.com/photo/64447677/.jpg"}} // Used for loading image from SERVER.
                        style={styles.image}
                        resizeMode="cover" />
                </View>

                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsTaken}</Text>  rounds to guess the number {props.userNumberChosen}.</BodyText>
                <MainButton onClicked={props.onRestart}>Start New Game</MainButton>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultText: {
        textAlign: 'center',
        marginHorizontal: 20

    },
    highlight: {
        color: colors.accent
    }
})

export default GameOverScreen