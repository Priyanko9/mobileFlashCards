import * as React from 'react';
import { Text, View, StyleSheet,FlatList,AsyncStorage, TouchableOpacity,Image } from 'react-native';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';
import {Decks} from '../data';
import Deck from './Deck';
import { withNavigation } from 'react-navigation';

class Home extends React.Component {

  constructor(props){
    super(props);
    AsyncStorage.setItem('DecksObject', JSON.stringify(Decks));
    this.state={
     decklist:this.initializeDecks(Decks),
     keys:Object.keys(Decks)
    }
  }
  initializeDecks(decksObj){
    let keys=Object.keys(decksObj);
    let decksArray=[];
    keys.forEach((ele)=>{
       decksArray.push({"key":ele,"deck":decksObj[ele]})
    })
    return decksArray;
  }
  componentDidMount(){
    this.props.navigation.addListener(
            'didFocus',
            payload => {
              AsyncStorage.getItem('DecksObject').then((val)=>{
                let decklist=this.initializeDecks(JSON.parse(val));
                //console.log("decklistnew:"+JSON.stringify(decklist));
                this.setState({
                  decklist,
                  keys:Object.keys(val)
                })
              });
            }
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.decklist}
            renderItem={({item}) => <TouchableOpacity onPress={() => {  
              console.log("item:"+JSON.stringify(item));
               this.props.navigation.navigate('DeckDetails',item)}}>
                <Deck deckItem={item}/>
           </TouchableOpacity> }
            ListHeaderComponent={()=><Text>All Decks</Text>}
            ListHeaderComponentStyle={styles.listheader}
        />
        <TouchableOpacity style={styles.button} onPress={() => {  
               this.props.navigation.navigate('NewDeck')}}>
            <Text style={styles.buttonText}>Add New Deck</Text>
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
    padding: 8
    
  },
  listheader:{
    textAlign:"center",
    justifyContent:"center"
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

export default withNavigation(Home);