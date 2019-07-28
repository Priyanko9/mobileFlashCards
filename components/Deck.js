import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Card } from 'react-native-paper';


const Deck=(props)=>{
  return (
      <View style={styles.container}>
            <Card style={styles.card}>
              <Text style={styles.paragraph}>
                {props.deckItem.key}
              </Text>
              <Text style={styles.paragraph}>
                Total Questions {props.deckItem.deck.questions.length}
              </Text>
            </Card>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
  },
  card:{
    height:100,
    alignItems: 'center',
    width:180,
    paddingTop:10
  }
});

export default Deck;