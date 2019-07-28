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
      deckNameInput:""
    }
}
addDeck(event){
  let name=this.state.deckNameInput;
  if(name!==""){
    let obj={
        [name]:{
          "title":name,
          questions:[]
        }
      }
    AsyncStorage.mergeItem('DecksObject',JSON.stringify(obj),(val)=>{
      AsyncStorage.getItem('DecksObject', (err, result) => {
        let deck=(JSON.parse(result))[name];
        let decknKeyObj={key:name,deck};
        this.props.navigation.navigate('DeckDetails',decknKeyObj);
      });
    });
  } else {
    Alert.alert("Please enter a deck name");
  }
}
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled 
      keyboardVerticalOffset="100">
            <TextInput style={styles.textInput} name="deckname" type="text" value={this.state.deckNameInput} placeholder="Enter Deck Name"
            onChangeText={(value)=>{
            this.setState({deckNameInput: value})
            }}/>
          <TouchableOpacity style={styles.button} onPress={()=>this.addDeck()}>
            <Text style={styles.buttonText}>Add Deck</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    marginTop:18,
    marginRight:40,
    left:10
  },
  buttonText:{
    color:'white'
  },
  textInput:{
    padding: 10,
    marginBottom:20,
    height:50,
    width:'88%',
    left:10,
    backgroundColor:'#FFFF99'
  }
});

