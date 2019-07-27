import * as React from 'react';
import { Text, View, StyleSheet,SectionList,
AsyncStorage,FlatList } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator ,createAppContainer} from 'react-navigation';
import { Notifications, Permissions } from 'expo';
// You can import from local files
import DeckDetails from './components/DeckDetails';
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import NewDeck from './components/NewDeck';
import QuizView from './components/QuizView';
import ScoreView from './components/ScoreView';
const Stack = createStackNavigator({
  Home: {
    screen: Home
  },
  DeckDetails: {
    screen: DeckDetails
  },
  NewQuestion:{
    screen:NewQuestion
  },
  NewDeck:{
    screen:NewDeck
  },
  QuizView:{
    screen:QuizView
  },
  ScoreView:{
    screen:ScoreView
  },
},{ initialRouteName: 'Home'});
const AppContainer = createAppContainer(Stack);
export default class App extends React.Component {

  clearLocalNotification () {
  return AsyncStorage.removeItem("lastQuizTaken")
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

createNotification () {
  return {
    title: 'Take Quiz',
    body: "you have not taken quiz for the day",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

 setLocalNotification () {
  AsyncStorage.getItem("lastQuizTaken")
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let today = new Date().getDay()
              console.log("notification");
                AsyncStorage.getItem("lastQuiz").then((val)=>{
                console.log("notificationinside:"+val);
                  let lastQuizDay=val?val.getDay():today;
                  //let lastQuizDay=new Date("26/07/2019").getDay();
                  if(today>lastQuizDay){
                    Notifications.scheduleLocalNotificationAsync(
                      this.createNotification(),
                      {
                        time:new Date().getTime() + 5000,
                        repeat: 'minute',
                      }
                    )
                  }
                   AsyncStorage.setItem("lastQuizTaken", JSON.stringify(true))
              })
      }
    })
}
})
}
componentDidMount(){
  this.setLocalNotification();
}


  render() {
    return (
      <AppContainer/>
    );
  }
}



