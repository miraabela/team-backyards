import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { DiveCard } from '../components/DiveCard';
import { Dive } from './Dive';


export class History extends React.Component {


  // get list of dives here,
  // if list is empty return "you have no dives!"
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
            <Text category='h3'>List of Dives</Text>
            <DiveCard style={styles.card}/>
        </ScrollView>
        )
    }
}


History.propTypes = {}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    margin: 5,
  }
  });
  