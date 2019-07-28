import * as React from 'react';
import { Text, View, StyleSheet,SectionList,
AsyncStorage,FlatList,TouchableOpacity,Animated } from 'react-native';
import Constants from 'expo-constants';
// You can import from local files
import { withNavigation } from 'react-navigation';
import {clearLocalNotification} from '../helper';

class QuizView extends React.Component {

  constructor(props){
    super(props);
    

    let questions=this.props.navigation.getParam("questions");
    this.state={
      questions,
      remainingQs:questions.length,
      currentQ:questions[0],
      currentQIndex:0,
      totalScore:0
    };
    this.setAnimation();
    
}
componentDidMount(){
  this.props.navigation.addListener(
            'didFocus',
            payload => {
                let questions=payload.state.params.questions||[];
                this.setState({
                  questions,
                  remainingQs:questions.length,
                  currentQ:questions[0],
                  currentQIndex:0,
                  totalScore:0
              })
            }
      );
}
setAnimation(){
  this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
}
flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }
  correctGuess(){
    this.setState({totalScore:++this.state.totalScore});
    this.setCurrentQuestion();
  }
  setCurrentQuestion(){
    let {questions,remainingQs,currentQ,currentQIndex,totalScore } = this.state
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    }
    this.setState({remainingQs:remainingQs-1});
    if(currentQIndex===questions.length-1){
      AsyncStorage.setItem("lastquiz",new Date());
      clearLocalNotification();
      this.props.navigation.navigate('ScoreView',{score:totalScore,
      deck:{questions:questions,
      title:this.props.navigation.getParam("title")}})
    } else if(currentQIndex < questions.length-1){
    this.setState({currentQIndex:++currentQIndex,currentQ:questions[currentQIndex]})
    }
  }
  
  render() {
    
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    
    return (
      <View style={styles.container}>
      {!this.state.questions.length>0 &&<View style={styles.noquizContainer}>
        <Text>No Quizzes</Text>
      </View>}
      {this.state.questions.length>0 && <View style={styles.container}>
            <Text style={styles.marginbottomText}>Remaining Questions {this.state.remainingQs}</Text>
            <View style={styles.questionContainer}>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity:   this.frontOpacity}]}>
                  <Text style={styles.text}>
                    {this.state.currentQ.question}
                  </Text>
                  <TouchableOpacity onPress={() => this.flipCard()}>
                    <Text style={styles.text}>Answer</Text>
                  </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
             <Text style={styles.text}>
                    {this.state.currentQ.answer}
             </Text>
             <TouchableOpacity onPress={() => this.flipCard()}>
                <Text style={styles.text}>Question</Text>
              </TouchableOpacity>
        </Animated.View>
        </View>
              
              <Text style={styles.text}>Mark Your Guess</Text>
          <TouchableOpacity style={styles.correctButton} onPress={() => {  
            this.correctGuess();
               }}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.incorrectButton} onPress={() => {  
            this.setCurrentQuestion();
               }}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
      </View>}
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
  },
  noquizContainer:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,  
  },
  text:{
    marginTop:30,
    textAlign:'center',
  },
  marginbottomText:{
    marginBottom:30,
    textAlign:'center'
  },
  correctButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    margin:20
  },
  incorrectButton:{
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin:20
  },
  buttonText:{
    color:'white'
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "green",
    position: "absolute",
    top: 0,
  },
  questionContainer:{
    flex: 1,
    alignItems: 'center',
  }

  
});


export default withNavigation(QuizView);
