import * as React from 'react';
import { Text, View, StyleSheet,SectionList,
AsyncStorage,FlatList,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
// You can import from local files


export default class ScoreView extends React.Component {

  constructor(props){
    super(props);
    this.state={
     deck:this.props.navigation.getParam("deck"),
     totalScore:this.props.navigation.getParam("score")
    }
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            Total Score {this.state.totalScore}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => {  
               this.props.navigation.navigate('DeckDetails',this.state.deck)}}>
            <Text style={styles.buttonText}>Back To Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {  
               this.props.navigation.navigate('QuizView',{deck:this.state.deck,fromPage:'scoreView'})}}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  text:{
    margin:20,
    textAlign:'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    margin:20,
  },
  buttonText:{
    color:'white'
  }
});


