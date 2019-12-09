import React from 'react';
import PropTypes from 'prop-types';
import {  Alert, StyleSheet, ScrollView, View, AsyncStorage } from 'react-native';
import { Button, Text, Input } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';
import moment from 'moment'


export class Dive extends React.Component {

    state = {data: {}, isLoading: true, continuingDive: false, timeSince: null, lastPG: '', currentPG: ''}
  

    calculateInterval = (start, ts) => {
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
        
            startPG = start
            interval = ts
            withinRules = true
            interval = 0
            endPG = ''
            endPGindex = 0
            timeintervals = []
    
            if (withinRules) {	
                timeintervals = startPGIntervals[startPG]
                for (let i = 0; i < timeintervals.length; i++) {
                    endPGindex = timeintervals.length - 1 - i;
                    if (interval <= timeintervals[i]) {
                        break
                    }
                }
                endPG = pgroups[endPGindex]
            }
            return endPG
            
      }    

    componentWillMount() {
      this.getData()
    }

    
    updateState = (data) => {
      if (data.diveHistory.length == 0) {
        this.setState({data: data, isLoading: false, continuingDive: false})
      } else {
        lastDive = data.diveHistory[data.diveHistory.length-1]
        last = moment(lastDive.surfacedTime)
        now = moment((new Date()).toISOString())
        ts = now.diff(last, 'minutes')
        lPG = data.diveHistory[data.diveHistory.length-1].endingPG
        cPG = this.calculateInterval(lPG, ts)

        this.setState({data: data, isLoading: false, continuingDive: true, timeSince: ts, lastPG: lPG, currentPG: cPG})
      }
    }
  
    getData = async () => {
      try {
        data = await AsyncStorage.getItem('userData')
        newState = JSON.parse(data)
        this.updateState(newState)
      } catch (error) {
        console.log(error)
      }
    }
  
    onChangeDepth = (value) => {
        this.setState(prevState => ({...prevState, data: {
            ...prevState.data,
            plannedDive: {...prevState.data.plannedDive, depth: value, withinRules: true}
        }}))
    };
    onChangeTime = (value) => {
        this.setState(prevState => ({...prevState, data: {
            ...prevState.data,
            plannedDive: {...prevState.data.plannedDive, time: value, withinRules: true}
        }}))
    };


    proceedPressed = async () => {
        try {
            AsyncStorage.mergeItem('userData', JSON.stringify(this.state.data))
        } catch (error) {
            console.log(error)
        }
        // Actions.Timer()
        Actions.DiveTimer({plannedDive: this.state.data.plannedDive})
    }


    calculateDive = () => {

        pgroups = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

        d10 = [10, 20, 26, 30, 34, 37, 41, 45, 50, 54, 59, 64, 70, 75, 82, 88, 95, 104, 112, 122, 133, 145, 160, 178, 199, 219];
        d12 = [9, 17, 23, 26, 29, 32, 35, 38, 42, 45, 49, 53, 57, 62, 66, 71, 76, 82, 88, 94, 101, 108, 116, 125, 134, 147];
        d14 = [8, 15, 19, 22, 24, 27, 29, 32, 35, 37, 40, 43, 47, 50, 53, 57, 61, 64, 68, 73, 77, 82, 87, 92, 98];
        d16 = [7, 13, 17, 19, 21, 23, 25, 27, 29, 32, 34, 37, 39, 42, 45, 48, 50, 53, 56, 60, 63, 67, 70, 72];
        d18 = [6, 11, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41, 43, 46, 48, 51, 53, 55, 56];
        d20 = [6, 10, 13, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 45];
        d22 = [5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 32, 34, 36, 37];
        d25 = [4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29];
        d30 = [3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20];
        d35 = [3, 5, 7, 8, 0, 9, 10, 11, 12, 13, 14];
        d40 = [0, 5, 6, 0, 7, 8, 9];
        d42 = [0, 4, 0, 6, 7, 8];
    
        depths = [10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40, 42];
        timeints = [d10, d12, d14, d16, d18, d20, d22, d25, d30, d35, d40, d42];
    
        if (this.state.data.plannedDive.depth == '' || this.state.data.plannedDive.time == '') {
            Alert.alert('Error','Please enter values');
            this.setState(prevState => ({...prevState, data: {
                ...prevState.data,
                plannedDive: {...prevState.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            }}))
            return null
        }

        depth = parseFloat(this.state.data.plannedDive.depth)
        time = parseFloat(this.state.data.plannedDive.time)
        withinRules = this.state.data.plannedDive.withinRules
        timeintervals = []
        safetystop = false
        newPgroup = ''
        planComments = ''

        if (depth > 42) {
            Alert.alert('Error','Depth must be less than 42 meters');
            this.setState(prevState => ({...prevState, data: {
                ...prevState.data,
                plannedDive: {...prevState.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            }}))
            return null
        }

        if ( time < 0 || depth < 0) {
            Alert.alert('Error','Please enter positive values');
            this.setState(prevState => ({...prevState, data: {
                ...prevState.data,
                plannedDive: {...prevState.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            }}))
            return null
        }

        if (withinRules) {	

            if (depth >= 30) {
                safetystop = true
                planComments = 'Proceed with caution.';
            }
            for (let i = 0; i < depths.length; i++) {
                timeintervals = [...timeints[i]]
                
                if (i >= depths.length - 6) {
                    safetystop = true
                }
                if (depth <= depths[i]) {
                    break
                }
            }
        }

        if (time > timeintervals[timeintervals.length - 1]) {
            Alert.alert('Error','Your time exceeds the no decompression limit');
            this.setState(prevState => ({...prevState, data: {
                ...prevState.data,
                plannedDive: {...prevState.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            }}))
            return null
        }
    
        if (withinRules) {
            for (let i = 0; i < timeintervals.length; i++) {
                newPgroup = pgroups[i];
                if (timeintervals[i] == 0) {
                    continue;
                }
                if (i >= timeintervals.length - 4) {
                    safetystop = true;
                    planComments = 'Proceed with caution.';
                }
                if (i >= timeintervals.length - 2) {
                    planComments = 
`WARNING: If you exceed planned bottom time by 5 minutes, an emergency decompression stop is required at 5 meters for 8 minutes.
Upon surfacing, the diver must remain out of the water for at least 6 hours prior to making another dive.
If a no decompression limit is exceeded by more than 5 minutes, a 5m decompression stop of no less than 15 minutes is urged (air supply permitting).
Upon surfacing, the diver must remain out of the water for at least 24 hours prior to making another dive.`;
                }
                if (time <= timeintervals[i]) {
                    break;
                }
            }
        }

        this.setState(prevState => ({...prevState, data: {
            ...prevState.data,
            plannedDive: {time: time.toString(), depth: depth.toString(), withinRules: true, newPgroup: newPgroup,
                safetystop: safetystop, calculatePressed: true, comments: planComments}
            }}))
    }








    render(){
        if (this.state.isLoading) {
            return <Text category='h2'>Loading...</Text>
        }

        if (this.state.continuingDive) {
            Actions.Continue({timeSince: this.state.timeSince, lastPG: this.state.lastPG, currentPG: this.state.currentPG})
            return <Text category='h2'>Continue Dive...</Text>
        }

        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='h6'>Start a New Dive</Text>
            <Text category='s1'>No recent dives within the past 6 hours.</Text>

            {/* <Text category='s1'>Current Pressure Group: A</Text>
            <Text category='h5'>{this.state.data.lastdive.pGroup}</Text>
            <Text category='s1'>Current Residual Nitrogen: 0</Text>
            <Text category='h5'>{this.state.data.lastdive.residualNitrogen}</Text> */}
            <Input label='DEPTH' placeholder='Enter depths below 42 meters.'
                value={this.state.data.plannedDive.depth}
                onChangeText={this.onChangeDepth}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />
             <Input label='BOTTOM TIME' placeholder='Enter bottom time.'
                value={this.state.data.plannedDive.time}
                onChangeText={this.onChangeTime}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />
            <Button style={styles.button} onPress={this.calculateDive}status='info'>Calculate Plan</Button>
            { this.state.data.plannedDive.withinRules && this.state.data.plannedDive.calculatePressed &&
            <View>
                <Text category='s1'>Planned Pressure Group:</Text>
                <Text category='h5'>{this.state.data.plannedDive.newPgroup}</Text> 
                <Text category='s1'>Safety Stop:</Text>
                <Text category='h5'>{this.state.data.plannedDive.safetystop ? 'Required at 5 meters for 3 minutes.' : 'Not Required'}</Text>
                <Text category='s1'>Comments:</Text>
                <Text category='h6'>{this.state.data.plannedDive.comments == '' ? 'None' : this.state.data.plannedDive.comments}</Text>

                <Button style={styles.button} onPress={this.proceedPressed}status={this.state.data.plannedDive.comments == '' ? 'success': 'warning'}>Proceed</Button>
            </View>}
        </ScrollView>
        )
    }
}

Dive.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    button: {
        margin: 5
    }
  });
  