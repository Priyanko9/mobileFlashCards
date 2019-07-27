import * as React from 'react';
import { Text, View, StyleSheet,SectionList,
AsyncStorage,FlatList,Button,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation';
// You can import from local files
import Deck from './Deck';
import {Decks} from '../data';
import Home from './Home';
export default class DeckDetails extends React.Component {

constructor(props){
    super(props);
    this.state={
      questions:this.props.navigation.getParam("deck").questions||[],
      title:this.props.navigation.getParam("key")||""
    };
}
componentDidMount(){
  this.props.navigation.addListener(
            'didFocus',
            payload => {
              console.log("testingout");
              AsyncStorage.getItem('DecksObject').then((val)=>{
                console.log("testingin");
                let deckObject=JSON.parse(val);
                let title=this.props.navigation.getParam("title");
                console.log("title:"+title);
                console.log("deckObject:"+deckObject);
                let questions=deckObject[title].questions;
                this.setState({
                  title,questions
                })
              })
            }
      );
}
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
              {this.state.title}
          </Text>
          <Text style={styles.text}>
              Total Questions {this.state.questions.length||0}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => {  
               this.props.navigation.navigate('QuizView',this.state)}}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {  
               console.log("this.state:"+this.state); 
               this.props.navigation.navigate('NewQuestion',this.state)}}>
            <Text style={styles.buttonText}>Add Question</Text>
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