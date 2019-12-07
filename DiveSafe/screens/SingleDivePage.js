import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';


export class SingleDivePage extends React.Component {


  // Access dive through props, 
  // list of dives displayed in DiveHistory, 
  // pass single dive data to DiveCard, onPress of DiveCard, Actions.SingleDivePage

  
  
    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='label'>Single Dive Page</Text>

            {/* Content goes inbetween ScrollView */}
            
        </ScrollView>
        )
    }
}


SingleDivePage.propTypes = {
  dive: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  