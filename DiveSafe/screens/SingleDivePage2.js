import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux'

// page from DiveCard.  pass dive as props.

export class SingleDivePage2 extends React.Component {

  finish = () => {
    Actions.History()
  }
  
    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>

            
            <Button onPress={this.finish}>Done</Button>


        </ScrollView>
        )
    }
}


SingleDivePage2.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  