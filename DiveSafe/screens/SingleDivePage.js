import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';


export class SingleDivePage extends React.Component {


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


SingleDivePage.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  