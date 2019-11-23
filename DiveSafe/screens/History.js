import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';


export class History extends React.Component {

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
            <Text category='label'>List of Dives</Text>
        </ScrollView>
        )
    }
}


History.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  