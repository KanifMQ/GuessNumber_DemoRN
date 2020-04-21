import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'
import {Apploading, AppLoading} from 'expo'

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [totalNoOfRounds, setNoOfRounds] = useState(0)
  const [isDataLoaded, setDataLoaded]=useState(false)

  if(!isDataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)}  onError={(err)=> console.log(err)}></AppLoading>
  }
  
  const startGameHandler = selectedNo => {
    setUserNumber(selectedNo)
    setNoOfRounds(0)
  }

  const gameOverHandler = noOfRounds => {
    setNoOfRounds(noOfRounds)
  }

  const startNewGameHandler = () => {
    setNoOfRounds(0)
    setUserNumber(null)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} /> //onStartGame-It will be called when user clicks "START GAME" button

  if (userNumber && totalNoOfRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (totalNoOfRounds > 0) {
    content = <GameOverScreen roundsTaken={totalNoOfRounds} userNumberChosen={userNumber} onRestart={startNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
