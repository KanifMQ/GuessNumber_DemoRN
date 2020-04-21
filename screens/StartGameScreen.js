import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import Card from '../components/Card'
import Colors from '../Constants/colors'
import Input from '../components/input'
import NumberContainer from '../components/NumberContainer';
import DefaultStyle from '../Constants/default-style'
import MainButton from '../components/MainButton';


const StartGameScreen = props => {
    const [enteredValue, setInputValue] = useState('')
    const [isConfirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth]=useState(Dimensions.get('window').width / 3)
    
    const updateLayout=()=>{
        setButtonWidth(Dimensions.get('window').width / 3)
    }

    Dimensions.addEventListener('change',updateLayout)//Notifies when device orientation changes

    const inputHandler = inputText => {
        setInputValue(inputText.replace('//[^0-9]/g'), '') //Replaces all non number input to blank
    };

    const resetButtonHandler = () => {
        setInputValue('')
    }

    const confirmButtonHandler = () => {
        const chosenNo = parseInt(enteredValue)
        if (isNaN(chosenNo) || chosenNo <= 0 || chosenNo > 99) {
            Alert.alert("Error", "Invalid number!!", [{ text: "Okay", style: "destructive", onPress: resetButtonHandler }])
            return;
        }

        setConfirmed(true)
        setSelectedNumber(chosenNo)
        setInputValue('')
        Keyboard.dismiss
    }

    let confirmedNo
    if (isConfirmed) {
        confirmedNo = (<Card style={styles.summaryContainer}>
            <Text>Chosen Number</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onClicked={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>)
    }

    //<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss}> ==> Dismisses keyboard when user taps anywhere on the screen
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <Text style={{ ...styles.titleContainer, ...DefaultStyle.title }}>Start a Game!!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyle.bodyText}>Select a number</Text>
                            <Input style={styles.myInput} blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={inputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width:buttonWidth}}><Button title="RESET" onPress={resetButtonHandler} color={Colors.accent}></Button></View>
                                <View style={{width:buttonWidth}}><Button title="CONFIRM" onPress={confirmButtonHandler} color={Colors.primary}></Button></View>
                            </View>
                        </Card>
                        {confirmedNo}
                    </View >
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        width: '100%'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: "center"
    },
    titleContainer: {
        fontSize: 20,
        marginVertical: 12,
        fontFamily: 'open-sans-bold'
    },
    myInput: {
        width: 80
    },
    summaryContainer: {
        marginTop: 15,
        alignItems: "center"
    }
});

export default StartGameScreen;