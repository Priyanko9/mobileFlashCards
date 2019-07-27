import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Card } from 'react-native-paper';

export default class Deck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
            <Card style={styles.card}>
              <Text style={styles.paragraph}>
                {this.props.deckItem.key}
              </Text>
            </Card>
      </View>
    );
  }
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
    height:60,
    alignItems: 'center',
    width:120,
    paddingTop:10
  }
});
