import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';


export class DiveSummary extends React.Component {


  // Access most recent dive stats, through diveHistory[diveHistory.length-1]

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


DiveSummary.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  