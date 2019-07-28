import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export function clearLocalNotification () {
  return AsyncStorage.removeItem("lastQuizTaken")
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
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

export function setLocalNotification () {
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