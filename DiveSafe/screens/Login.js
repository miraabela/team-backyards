import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';


export class Login extends React.Component {

    state = {
        user: 'Username',
        lastdive: {
          pGroup: '',
          residualNitrogen: '',
          surfaceInterval: '',
        },
        plannedDive: {
            depth: '',
            time: '',
            newPgroup: '',
            safetystop: false,
            withinRules: true,
            calculatePressed: false,
        },
        diveHistory: []
    }
    
    logIn = async () => {
        try {
            AsyncStorage.setItem('userData', JSON.stringify(this.state))
        } catch (error) {
            console.log(error)
        }
        Actions.Home()
    }


    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Button style={styles.button} onPress={this.logIn} status='success'>Login</Button>
        </ScrollView>
        )
    }
}


Login.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  