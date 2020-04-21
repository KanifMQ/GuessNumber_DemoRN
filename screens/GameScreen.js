import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';


const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNo = Math.floor(Math.random() * (max - min)) + min
    if (randomNo === exclude) {
        generateRandomNumber(min, max, exclude)
    } else {
        return randomNo
    }
}

const renderGuessListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <Text>#{listLength - itemData.index}</Text>
            <Text>{itemData.item}</Text>
        </View>
    )
}
const GameScreen = props => {
    const initialGuess = generateRandomNumber(1, 99, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [passGuessList, setPastGuesses] = useState([initialGuess.toString()])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props //This is called destructuring.

    const [availableDeviceHeight, setAvailableDeviceHeight]=useState(Dimensions.get('window').height)

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change',updateLayout)

        return()=>{
            Dimensions.removeEventListener('change',updateLayout)
        }
    })
    useEffect(
        () => {
            if (currentGuess === userChoice) {
                onGameOver(passGuessList.length)
            }
        }, [currentGuess, userChoice, onGameOver]
    )// useEffect runs on each rendering of component(GameScreen). params-> function to execute,dependacies needed for function which is to be executed. 
    const nextRandomNumberHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater') && currentGuess > props.userChoice) {
            Alert.alert("Don\'t lie!!", "You know that this is wrong.!!", [{ text: "Sorry!!", style: "cancel" }])
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1 //+1 added to fix key issue in bottom guess list
        }
        let nextRandomNo = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextRandomNo)
        // setRounds(curRounds=>curRounds+1)
        setPastGuesses(curPastGuess => [nextRandomNo.toString(), ...curPastGuess])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onClicked={nextRandomNumberHandler.bind(this, 'lower')}>Lower</MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onClicked={nextRandomNumberHandler.bind(this, 'greater')}>Greater</MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView>
                        {passGuessList.map((guess,index )=> renderGuessListItem(guess, passGuessList.length-index))}
                    </ScrollView> */}

                    <FlatList
                        keyExtractor={(item) => item}
                        data={passGuessList}
                        renderItem={renderGuessListItem.bind(this, passGuessList.length)}
                        contentContainerStyle={styles.listContainer}>

                    </FlatList>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onClicked={nextRandomNumberHandler.bind(this, 'lower')}>Lower</MainButton>
                <MainButton onClicked={nextRandomNumberHandler.bind(this, 'greater')}>Greater</MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView>
                    {passGuessList.map((guess,index )=> renderGuessListItem(guess, passGuessList.length-index))}
                </ScrollView> */}

                <FlatList
                    keyExtractor={(item) => item}
                    data={passGuessList}
                    renderItem={renderGuessListItem.bind(this, passGuessList.length)}
                    contentContainerStyle={styles.listContainer}>

                </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '80%' : '70%',
        marginTop: 10,
        justifyContent: "space-between",
        flex: 1 //To fix scroll issue in Android
    },
    listItem: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#ccc',
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    controls:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:'80%'
    }
})
export default GameScreen