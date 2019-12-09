import React from 'react';
import PropTypes from 'prop-types';
import {  Alert, StyleSheet, ScrollView, View, AsyncStorage } from 'react-native';
import { Button, Text, Input } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';

export class Continue extends React.Component {

 
    state = {
        lastPG: '', //input
        depth: '', //input
        nitroMins: '', //out
        maxPlanTime: '', //out
        withinRules1: true,
        calculatePressed1: false,

        plannedTime: '', //input
        totalBottomTime: '', //out
        endPG: '', //out
        comments: '', //out
        safetystop: false, //out
        withinRules2: true,
        calculatePressed2: false,
    }

    onChangeLastPG = (value) => {
        this.setState({...this.state, lastPG: value, withinRules1: true})
    };
    onChangeDepth = (value) => {
        this.setState({...this.state, depth: value, withinRules1: true})
    };
    onChangePlannedTime = (value) => {
        this.setState({...this.state, plannedTime: value, withinRules1: true, withinRules2: true})
    };


     calculateContinue = () => {

        console.log(this.state)

        pgroups = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

        c10 = [[10, 20, 26, 30, 34, 37, 41, 45, 50, 54, 59, 64, 70, 75, 82, 88, 95, 104, 112, 122, 133, 145, 160, 178, 199, 219],
        [209, 199, 193, 189, 185, 182, 178, 174, 169, 165, 160, 155, 149, 144, 137, 131, 124, 115, 107, 97, 86, 74, 59, 41, 20]],
        
        c12 = [[9, 17, 23, 26, 29, 32, 35, 38, 42, 45, 49, 53, 57, 62, 66, 71, 76, 82, 88, 94, 101, 108, 116, 125, 134, 147], 
        [138, 130, 124, 121, 118, 115, 112, 109, 105, 102, 98, 94, 90, 85, 81, 76, 71, 65, 59, 53, 46, 39, 31, 22, 13]], 
        
        c14 = [[8, 15, 19, 22, 24, 27, 29, 32, 35, 37, 40, 43, 47, 50, 53, 57, 61, 64, 68, 73, 77, 82, 87, 92, 98], 
        [90, 83, 79, 76, 74, 71, 69, 66, 63, 61, 58, 55, 51, 48, 45, 41, 37, 34, 30, 25, 21, 16, 11, 6]],
        
        c16 = [[7, 13, 17, 19, 21, 23, 25, 27, 29, 32, 34, 37, 39, 42, 45, 48, 50, 53, 56, 60, 63, 67, 70, 72],
        [65, 59, 55, 53, 51, 49, 47, 45, 43, 40, 38, 35, 33, 30, 27, 24, 22, 19, 16, 12, 9, 5, 2]],
        
        c18 =  [[6, 11, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41, 43, 46, 48, 51, 53, 55, 56],
        [50, 45, 41, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 17, 15, 13, 10, 8, 5, 3]],
        
        c20 =  [[6, 10, 13, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 45],
        [39, 35, 32, 30, 29, 27, 25, 24, 22, 20, 19, 17, 15, 13, 11, 9, 7, 5, 3]],
        
        c22 = [[5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 32, 34, 36, 37],
        [32, 28, 25, 24, 22, 21, 19, 18, 16, 15, 13, 12, 10, 8, 7, 5, 3]],
        
        c25 = [[4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29],
        [25, 21, 19, 18, 16, 15, 14, 12, 11, 10, 8, 7, 6, 4, 3]],
        
        c30 = [[3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20],
        [17, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]],
        
        c35 =[[3, 5, 7, 8, 9, 9, 10, 11, 12, 13, 14],
        [11, 9, 7, 6, 5, 5, 4, 3]],
        
        c40 = [[2, 5, 6, 7, 7, 8, 9],
        [7, 4]]
        
        depths = [10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40, 42];
        timeints = [c10, c12, c14, c16, c18, c20, c22, c25, c30, c35, c40];

        if (this.state.lastPG == '' || this.state.depth == '') { 
            Alert.alert('Error','Please enter all input values');
            this.setState(prevState => ({...prevState, withinRules1: false, calculatePressed1: false, 
                lastPG: '', depth: '', nitroMins: '', maxPlanTime: '', 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
                withinRules2: true, calculatePressed2: false}))
            return null
        }

        lastPG = this.state.lastPG.toUpperCase().trim()
        depth = parseFloat(this.state.depth)
        withinRules1 = this.state.withinRules1
        nitroMins = 0
        maxPlanTime = 0
        depthSelect = []
        lastPGIndex = -1

        if (!(lastPG.match(/^[A-Z]$/))) {
            Alert.alert('Error','Please enter a single letter from A-Z');
            this.setState(prevState => ({...prevState, withinRules1: false, calculatePressed1: false, 
                lastPG: '', depth: '', nitroMins: '', maxPlanTime: '', 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
                withinRules2: true, calculatePressed2: false}))
            return null
        }

        if (depth < 0) {
            Alert.alert('Error','Please enter positive values');
            this.setState(prevState => ({...prevState, withinRules1: false, calculatePressed1: false, 
                lastPG: '', depth: '', nitroMins: '', maxPlanTime: '', 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
                withinRules2: true, calculatePressed2: false}))
            return null
        }

        if (depth > 40) {
            Alert.alert('Error','Please enter up to 40 meters');
            this.setState(prevState => ({...prevState, withinRules1: false, calculatePressed1: false, 
                lastPG: '', depth: '', nitroMins: '', maxPlanTime: '', 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
                withinRules2: true, calculatePressed2: false}))
            return null
        }


        if (withinRules1) {
            for (let i = 0; i < depths.length; i++) {
                depthSelect = [...timeints[i]]
                if (depth <= depths[i]) {
                    break
                }
            }
            lastPGIndex = pgroups.indexOf(lastPG)

            if (lastPGIndex >= 0) {
                if (lastPGIndex >= depthSelect[0].length) {
                    Alert.alert('Sorry','Depth is too high for your current pressure group.');
                    this.setState(prevState => ({...prevState, withinRules1: false, calculatePressed1: false, 
                        lastPG: '', depth: '', nitroMins: '', maxPlanTime: '', 
                        plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
                        withinRules2: true, calculatePressed2: false}))
                    return null
                } else {
                    nitroMins = depthSelect[0][lastPGIndex]
                }
                if (lastPGIndex >= depthSelect[1].length) {
                    Alert.alert('Sorry','Cannot Dive. Too close to decompression limits.');
                    this.setState(prevState => ({...prevState, withinRules1: false, calculatePressed1: false, 
                        lastPG: '', depth: '', nitroMins: '', maxPlanTime: '', 
                        plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
                        withinRules2: true, calculatePressed2: false}))
                    return null
                } else {
                    maxPlanTime = depthSelect[1][lastPGIndex]
                }
            }

        }

        this.setState(prevState => ({...prevState, withinRules1: true, calculatePressed1: true, 
            lastPG: lastPG, depth: depth.toString(), nitroMins: nitroMins.toString(), maxPlanTime: maxPlanTime.toString(), 
            plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false,
            withinRules2: true, calculatePressed2: false}))
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
    
        depths = [10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40];
        timeints = [d10, d12, d14, d16, d18, d20, d22, d25, d30, d35, d40];
    
        if (this.state.plannedTime == '') {
            Alert.alert('Error','Please enter values');
            this.setState(prevState => ({...prevState, withinRules2: false, calculatePressed2: false, 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false}))
            return null
        }


        depth = parseFloat(this.state.depth)
        nitroMins = parseFloat(this.state.nitroMins)
        maxPlanTime = parseFloat(this.state.maxPlanTime)
        
        plannedTime = parseFloat(this.state.plannedTime)
        totalBottomTime = 0
        endPG = ''
        comments = ''
        safetystop = false
        withinRules2 = this.state.withinRules2

        timeintervals = []


        if (plannedTime > maxPlanTime) {
            Alert.alert('Error','Planned time exceeds max allowed.');
            this.setState(prevState => ({...prevState, withinRules2: false, calculatePressed2: false, 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false}))
            return null
        }

        if ( plannedTime < 0 ) {
            Alert.alert('Error','Please enter positive values');
            this.setState(prevState => ({...prevState, withinRules2: false, calculatePressed2: false, 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false}))
            return null
        }

        if (withinRules2) {	
            totalBottomTime = plannedTime + nitroMins
            if (depth >= 30) {
                safetystop = true
                comments = 'Proceed with caution.';
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

        if (totalBottomTime > timeintervals[timeintervals.length - 1]) {
            Alert.alert('Error','Your time exceeds the no decompression limit');
            this.setState(prevState => ({...prevState, withinRules2: false, calculatePressed2: false, 
                plannedTime: '', totalBottomTime: '', endPG: '', comments: '', safetystop: false}))
            return null
        }
    
        if (withinRules2) {
            for (let i = 0; i < timeintervals.length; i++) {
                endPG = pgroups[i];
                if (timeintervals[i] == 0) {
                    continue;
                }
                if (i >= timeintervals.length - 4) {
                    safetystop = true;
                    comments = 'Proceed with caution.';
                }
                if (i >= timeintervals.length - 2) {
                    comments = 
`WARNING: If you exceed planned bottom time by 5 minutes, an emergency decompression stop is required at 5 meters for 8 minutes.
Upon surfacing, the diver must remain out of the water for at least 6 hours prior to making another dive.
If a no decompression limit is exceeded by more than 5 minutes, a 5m decompression stop of no less than 15 minutes is urged (air supply permitting).
Upon surfacing, the diver must remain out of the water for at least 24 hours prior to making another dive.`;
                }
                if (totalBottomTime <= timeintervals[i]) {
                    break;
                }
            }
        }

        this.setState(prevState => ({...prevState, withinRules1: true, calculatePressed1: true, 
            lastPG: lastPG, depth: depth.toString(), nitroMins: nitroMins.toString(), maxPlanTime: maxPlanTime.toString(), 
            plannedTime: plannedTime.toString(), totalBottomTime: totalBottomTime.toString(), endPG: endPG, comments: comments, safetystop: false,
            withinRules2: true, calculatePressed2: true}))
    }


    proceedPressed = () => {
        try {
            AsyncStorage.mergeItem('userData', JSON.stringify(this.state.data))
        } catch (error) {
            console.log(error)
        }
        // Actions.Timer()
        Actions.DiveTimer()
    }
    render(){

        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>

            <Text category='s1'>Based on Surface Interval Calculator, input Last Pressure Group</Text>
            <Input label='LAST PG' placeholder='Enter last pressure group.'
                value={this.state.lastPG}
                onChangeText={this.onChangeLastPG}
                returnKeyType='done'
                size='medium'
                />
                
             <Input label='DEPTH' placeholder='Enter a depth UNDER 40 METERS'
                value={this.state.depth}
                onChangeText={this.onChangeDepth}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />


            <Button style={styles.button} onPress={this.calculateContinue}status='info'>Calculate Constraints</Button>
            {this.state.withinRules1 && this.state.calculatePressed1 &&
            <View>
                <Text category='s1'>Residual Nitrogen Minutes:</Text>
                <Text category='h4'>{this.state.nitroMins}</Text>
                <Text category='s1'>Max Allowed Planned Time:</Text>
                <Text category='h4'>{this.state.maxPlanTime}</Text> 
                
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, margin: 10, }}/>

                <Text category='s1'>Enter Planned Time (Actual Bottom Time)</Text>
                <Input placeholder='Enter planned time below max allowed.'
                value={this.state.plannedTime}
                onChangeText={this.onChangePlannedTime}
                keyboardType='numeric'
                returnKeyType='done'
                size='medium'
                />
                <Button style={styles.button} onPress={this.calculateDive}status='info'>Calculate Dive</Button>

            </View>}
            {this.state.withinRules2 && this.state.calculatePressed2 &&
            <View>
                <Text category='s2'>Total Bottom Time: (Residual + Actual)</Text>
                <Text category='h5'>{this.state.totalBottomTime}</Text>
                <Text category='s1'>Depth:</Text>
                <Text category='h4'>{this.state.depth}</Text> 
                <Text category='s1'>Ending Pressure Group:</Text>
                <Text category='h4'>{this.state.endPG}</Text> 
                <Text category='s1'>Comments:</Text>
                <Text category='h6'>{this.state.comments == '' ? 'None' : this.state.comments}</Text>
                <Button style={styles.button} onPress={this.proceedPressed}status={this.state.comments == '' ? 'success': 'warning'}>Proceed</Button>
                <View style={{margin: 25}}/>
            </View>}
        </ScrollView>
        )
    }
}

Continue.propTypes = {}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    button: {
        margin: 5
    }
  });
  