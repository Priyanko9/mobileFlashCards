import * as React from 'react';
import { Text, View, StyleSheet,SectionList,
AsyncStorage,FlatList } from 'react-native';
import Constants from 'expo-constants';
import {AppContainer} from './route';
import {setLocalNotification} from './helper';

export default class App extends React.Component {

  
componentDidMount(){
  setLocalNotification();
}


  render() {
    return (
      <AppContainer/>
    );
  }
}



