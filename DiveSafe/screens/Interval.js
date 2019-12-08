import React from 'react';
import PropTypes from 'prop-types';
import {  Alert, StyleSheet, ScrollView, View, AsyncStorage } from 'react-native';
import { Button, Text, Input } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';

export class Interval extends React.Component {

 
    state = {
        startPG: '',
        hours: '0',
        minutes: '0',
        interval: '',
        endPG: '',
        withinRules: true,
        calculatePressed: false,
    }

    onChangeHours = (value) => {
        this.setState({...this.state, hours: value})

    };
    onChangeMinutes = (value) => {
        this.setState({...this.state, minutes: value})
    };
    onChangeStartPG = (value) => {
        this.setState({...this.state, startPG: value})
    };


    calculateDive = () => {

        pgroups = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

        startPGIntervals = {
            'A': [180], 
            'B': [47, 228], 
            'C': [21, 69, 250], 
            'D': [8, 30, 78, 259], 
            'E': [7, 16, 38, 87, 268], 
            'F': [7, 15, 24, 46, 94, 275], 
            'G': [6, 13, 22, 31, 53, 101, 282], 
            'H': [5, 12, 20, 28, 37, 59, 107, 288], 
            'I': [5, 11, 18, 26, 34, 43, 65, 113, 294], 
            'J': [5, 11, 17, 24, 31, 40, 49, 71, 119, 300], 
            'K': [4, 10, 16, 22, 29, 37, 45, 54, 76, 124, 305], 
            'L': [4, 9, 15, 21, 27, 34, 42, 50, 59, 81, 129, 310], 
            'M': [4, 9, 14, 19, 25, 32, 39, 46, 55, 64, 85, 134, 315], 
            'N': [3, 8, 13, 18, 24, 30, 36, 43, 51, 59, 68, 90, 138, 319], 
            'O': [3, 8, 12, 17, 23, 28, 34, 41, 47, 55, 63, 72, 94, 143, 324], 
            'P': [3, 7, 12, 16, 21, 27, 32, 38, 45, 51, 59, 67, 76, 98, 147, 328], 
            'Q': [3, 7, 11, 16, 20, 25, 30, 36, 42, 48, 55, 63, 71, 80, 102, 150, 331], 
            'R': [3, 7, 11, 15, 19, 24, 29, 34, 40, 46, 52, 59, 67, 75, 84, 106, 154, 335], 
            'S': [3, 6, 10, 14, 18, 23, 27, 32, 38, 43, 49, 56, 63, 70, 78, 87, 109, 158, 339], 
            'T': [2, 6, 10, 13, 17, 22, 26, 31, 36, 41, 47, 53, 59, 66, 73, 82, 91, 113, 161, 342], 
            'U': [2, 6, 9, 13, 17, 21, 25, 29, 34, 39, 44, 50, 56, 62, 69, 77, 85, 94, 116, 164, 345], 
            'V': [2, 5, 9, 12, 16, 20, 24, 28, 33, 37, 42, 47, 53, 59, 65, 72, 80, 88, 97, 119, 167, 348], 
            'W': [2, 5, 8, 12, 15, 19, 23, 27, 31, 36, 40, 45, 50, 56, 62, 68, 75, 83, 91, 100, 122, 170, 351], 
            'X': [2, 5, 8, 11, 15, 18, 22, 26, 30, 34, 39, 43, 48, 53, 59, 65, 71, 78, 86, 94, 103, 125, 173, 354], 
            'Y': [2, 5, 8, 11, 14, 18, 21, 25, 29, 33, 37, 41, 46, 51, 56, 62, 68, 74, 81, 89, 97, 106, 128, 176, 357], 
            'Z': [2, 5, 8, 11, 14, 17, 20, 24, 28, 31, 35, 40, 44, 49, 54, 59, 65, 71, 77, 84, 91, 100, 109, 131, 179, 360]}
    
        // end pgroup = len(intervals) - 1 - index

        if (this.state.startPG == '' ) {
            Alert.alert('Error','Please enter start pressure group');
            this.setState({...this.state, withinRules: false, calculatePressed: false, startPG: '', hours: '0', minutes: '0', interval: '', endPG: ''})
            return null
        }

        startPG = this.state.startPG.toUpperCase().trim()
        hours = parseFloat(this.state.hours)
        minutes = parseFloat(this.state.minutes)
        withinRules = this.state.withinRules
        interval = 0
        endPG = ''
        endPGindex = 0
        timeintervals = []

        if (!(startPG.match(/^[A-Z]$/))) {
            Alert.alert('Error','Please enter a single letter from A-Z');
            this.setState({...this.state, withinRules: false, calculatePressed: false, startPG: '', hours: '0', minutes: '0', interval: '', endPG: ''})
            return null
        }

        if ( hours < 0 || minutes < 0) {
            Alert.alert('Error','Please enter positive values');
            this.setState({...this.state, withinRules: false, calculatePressed: false, startPG: '', hours: '0', minutes: '0', interval: '', endPG: ''})
            return null
        }

        if ( minutes > 60) {
            Alert.alert('Error','Please enter up to 60 minutes');
            this.setState({...this.state, withinRules: false, calculatePressed: false, startPG: '', hours: '0', minutes: '0', interval: '', endPG: ''})
            return null
        }

        if (withinRules) {	
            timeintervals = startPGIntervals[startPG]
            interval = (hours * 60) + minutes
            for (let i = 0; i < timeintervals.length; i++) {
                endPGindex = timeintervals.length - 1 - i;
                if (interval <= timeintervals[i]) {
                    break
                }
            }
            endPG = pgroups[endPGindex]
        }

        this.setState({...this.state, withinRules: true, calculatePressed: true, startPG: startPG, hours: hours.toString(), minutes: minutes.toString(), interval: interval.toString(), endPG: endPG})

    }

    render(){

        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>

            <Input label='Start PG' placeholder='Enter starting pressure group.'
                value={this.state.startPG}
                onChangeText={this.onChangeStartPG}
                returnKeyType='done'
                size='medium'
                />
             <Input label='HOURS' placeholder='0'
                value={this.state.hours}
                onChangeText={this.onChangeHours}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />
             <Input label='MINUTES' placeholder='0'
                value={this.state.minutes}
                onChangeText={this.onChangeMinutes}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />


            <Button style={styles.button} onPress={this.calculateDive}status='info'>Calculate Interval</Button>
            { this.state.withinRules && this.state.calculatePressed &&
            <View>
                <Text category='s1'>Ending Pressure Group:</Text>
                <Text category='h4'>{this.state.endPG}</Text>
                <Text category='s1'>Interval in minutes:</Text>
                <Text category='h6'>{this.state.interval}</Text> 
                
            </View>}

        </ScrollView>
        )
    }
}

Interval.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    button: {
        margin: 5
    }
  });
  