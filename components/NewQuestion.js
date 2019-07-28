import * as React from 'react';
import { Text, View, StyleSheet,SectionList,
AsyncStorage,FlatList,Button,TouchableOpacity,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation';
// You can import from local files
import Deck from './Deck';
import {Decks} from '../data';
import Home from './Home';
export default class NewDeck extends React.Component {

constructor(props){
    super(props);
    this.state={
      question:"",
      answer:""
    }
}
addQuestion(event){
  if(this.state.question!==""&&this.state.answer!==""){
      const title=this.props.navigation.getParam("title");
      const questions=this.props.navigation.getParam("questions")||{};
    AsyncStorage.mergeItem('DecksObject',JSON.stringify({
      [title]:{
        title,
        "questions":[...questions,
          {
            "question":this.state.question,
            "answer":this.state.answer
          }
        ]
      }
    })).then((value)=>{
      AsyncStorage.getItem('DecksObject').then((val)=>{
        console.log("newQval:"+val);
        this.props.navigation.navigate('DeckDetails',{title});
      })
      
    })
  } else{
    Alert.alert("Please enter both question and answer");
  }
}
handleChange(val,label){
  this.setState({
    [label]:val
  })
}
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled 
      keyboardVerticalOffset="100">
        <View style={styles.container}>
          <TextInput style={styles.textInputQuestion} name="question" type="text" value={this.state.question} placeholder="Enter Question"
            onChangeText={value=>this.handleChange(value,"question")}/>
          <TextInput style={styles.textInputAnswer} name="answer" type="text" value={this.state.answer} placeholder="Enter Answer"
            onChangeText={value=>this.handleChange(value,"answer")}/>
          <TouchableOpacity style={styles.button} onPress={()=>this.addQuestion()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  textInputQuestion:{
    
    padding: 10,
    marginBottom:20,
    height:50,
    width:'88%',
    left:10,
    backgroundColor:'#FFFF99'
  },
  textInputAnswer:{
    
    padding: 10,
    marginBottom:20,
    height:50,
    width:'88%',
    left:10,
    backgroundColor:'#FFFF99'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    marginTop:20,
    marginRight:24,
    marginLeft:10
  },
  buttonText:{
    color:'white'
  }
});