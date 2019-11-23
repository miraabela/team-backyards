import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Text , Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';


export class Home extends React.Component {

    state = {
      name = "Username",
      lastdive = "24 hours",
      pressureGroup = "A",
      residualNitrogen = 0,
    }
    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='label'>Welcome, {this.state.name}</Text>
            <Text category='s2'>It has been <strong>{this.state.lastdive}</strong> since your last dive.</Text>
            <Text category='s2'>Your current pressure group is <strong>{this.state.pressureGroup}.</strong></Text>
            <Text category='s2'>You have <strong>{this.state.pressureGroup} residual nitrogen minutes.</strong></Text>
            <Button style={styles.button} status='info'>Start Dive</Button>
            <Button style={styles.button} status='info'>See History</Button>
        </ScrollView>
        )
    }
}


Home.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  