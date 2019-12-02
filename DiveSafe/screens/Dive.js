import React from 'react';
import PropTypes from 'prop-types';
import {  Alert, StyleSheet, ScrollView, View, AsyncStorage } from 'react-native';
import { Button, Text, Input } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';

// TODO
// ask user DID YOU DIVE WITHIN THE LAST 24 HOURS?
// check if last dive was more than 24 hours ago
// if not, goto continuing dive


export class Dive extends React.Component {

    state = {data: {}, isLoading: true}
    newData = {}
  
    componentWillMount() {
      this.getData()
    }
    updateState = (data) => {
      this.setState({data: data, isLoading: false})
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
        this.setState({
            plannedDive: {...this.state.data.plannedDive, depth: value, withinRules: true}
        })
    };
    onChangeTime = (value) => {
        this.setState({
            plannedDive: {...this.state.data.plannedDive, time: value, withinRules: true}
        })
    };


    proceedPressed = async () => {
        try {
            AsyncStorage.mergeItem('userData', JSON.stringify(this.state.data))
        } catch (error) {
            console.log(error)
        }
        Actions.Timer
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
            this.setState({
                plannedDive: {...this.state.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            })
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
            this.setState({
                plannedDive: {...this.state.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            })
            return null
        }

        if ( time < 0 || depth < 0) {
            Alert.alert('Error','Please enter positive values');
            this.setState({
                plannedDive: {...this.state.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            })
            return null
        }

        if (withinRules) {	
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
            this.setState({
                plannedDive: {...this.state.data.plannedDive, withinRules: false, calculatePressed: false, newPgroup: '', time: '', depth: '', comments: '', safetystop: false}
            })
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


        this.setState({
            plannedDive: {time: time.toString(), depth: depth.toString(), withinRules: true, newPgroup: newPgroup,
                safetystop: safetystop, calculatePressed: true, comments: planComments}
        })
    }

    render(){
        if (this.state.isLoading) {
            return <Text category='h2'>Loading...</Text>
        }
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='s1'>Current Pressure Group: </Text>
            <Text category='h5'>{this.state.lastdive.pGroup}</Text>
            <Text category='s1'>Current Residual Nitrogen: </Text>
            <Text category='h5'>{this.state.lastdive.residualNitrogen}</Text>
            <Input label='DEPTH' placeholder='Enter depths below 42 meters.'
                value={this.state.plannedDive.depth}
                onChangeText={this.onChangeDepth}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />
             <Input label='BOTTOM TIME' placeholder='Enter bottom time.'
                value={this.state.plannedDive.time}
                onChangeText={this.onChangeTime}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />
            <Button style={styles.button} onPress={this.calculateDive}status='info'>Calculate Plan</Button>
            { this.state.plannedDive.withinRules && this.state.plannedDive.calculatePressed &&
            <View>
                <Text category='s1'>Planned Pressure Group:</Text>
                <Text category='h5'>{this.state.plannedDive.newPgroup}</Text> 
                <Text category='s1'>Safety Stop:</Text>
                <Text category='h5'>{this.state.plannedDive.safetystop ? 'Required at 5 meters for 3 minutes.' : 'Not Required'}</Text>
                <Text category='s1'>Comments:</Text>
                <Text category='h6'>{this.state.plannedDive.comments == '' ? 'None' : this.state.plannedDive.comments}</Text>

                <Button style={styles.button} onPress={this.proceedPressed}status={this.state.plannedDive.comments == '' ? 'success': 'warning'}>Proceed</Button>
            </View>}
            {console.log(this.state)}
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
  