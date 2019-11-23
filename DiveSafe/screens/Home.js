import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';


export class Home extends React.Component {

    state = {
      user: "Username",
      lastdive: "24 hours",
      pressureGroup: "A",
      residualNitrogen: 0,
    }
    render(){

        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='h4'>Welcome, {this.state.user}</Text>
            <Text category='h5'>It has been {this.state.lastdive} since your last dive.</Text>
            <Text category='h5'>Your current pressure group is {this.state.pressureGroup}.</Text>
            <Text category='h5'>You have {this.state.residualNitrogen} residual nitrogen minutes.</Text>
            <Button onPress={Actions.Dive} status='info'>Start Dive</Button>
            <Button onPress={Actions.History} status='info'>See History</Button>
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
  