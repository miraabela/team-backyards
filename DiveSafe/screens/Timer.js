import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';


export class Timer extends React.Component {

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

    DEFAULT = {
        currentPgroup: '', //assign to planned pGroup at  updateState
  
        isDescending: false, //should be true as soon as timer starts. update to false when stop button pressed
        startedDescent: '', // new Date() as soon as Start Timer is pressed
        currentBottomTime: '', //update every 5 seconds. Stop updating when paused or stopped
        
        exceeded: false, // true if went over planned dive time
        statusMessage: '', //update warning when almost about to exceed planned dive time maximum, etc
        logOfMessages: [], //keeps track of messages displayed to user
  
        isAscending: false, //should be false until Ascend Timer is started. 
        startedAscent: '', //new Date() when Ascend Timer is pressed
        currentAscendTime: '', //zero initially, update every 5 seconds after Ascent Timer is pressed
        
        // Pause ascending timer, start safetystop, after done, resume ascending
        // only transition to safety stsop timer if required in plan, or if exceeded time & recalculated plan requires stop
        isSafetyStopping: false, //should be false until Ascend Timer is paused & safety started 
        safetystop: '', // assign to planned unless exceeded dive time, then recalculate
        startedSafetyStop: '', //new Date() as soon as Safety Stop is pressed, ONLY IF NEEDED
        currentSafetyTime: '', //update every 5 seconds. Stop updating when paused or stopped
  
  
        surfaced: false, //should be false until ascend timer is done. then update to true
        surfacedTime: '', //new Date() when ascend timer is stopped

        endPgroup: '',
        actualDepth: '', //
        actualTime: '', // Actual bottom time (descend time only)
        location: 'Honolulu', // can just be Honolulu for now until updated
      }

      
    continueToSummary = async () => {
        
        if (this.state.data.surfaced == true) {
            this.setState({diveHistory: {...this.state.data.diveHistory, diveHistory: this.state.data.diveHistory.concat(this.state.data.currentDive)}})
            this.setState({currentDive: DEFAULT})
            try {
                AsyncStorage.mergeItem('userData', JSON.stringify(this.state.data))
            } catch (error) {
                console.log(error)
            }
            Actions.DiveSummary
        }
    }



    // premade messages to display. you dont need to use everything
    // easily access through this.messages.ok
    // how to update status message
    // this.setState({currentDive: {...this.state.currentDive, statusMessage: this.messages.ok})
    // how to update logOfMessages
    // this.setState({currentDive: {...this.state.currentDive, logOfMessages: this.state.logOfMessages.concat(this.messges.ok)}})
    messages = {
        ok: 'Ready to begin dive timers',

        startD: 'Descend Timer Started.',
        pauseD: 'Descend Timer Paused',
        resumeA: 'Descend Timer Resumed',
        endD: 'Descend Timer Stopped',

        warn: 'WARNING: You are almost near the end of your planned dive time. Begin ascending soon.',
        exceeded: 'WARNING: You have exceeded your planned dive time. Recalculating pressure group & safety stop.',

        startA: 'Ascend Timer Started',
        pauseA: 'Ascend Timer Paused',
        resumeA: 'Ascend Timer Resumed',
        endA: 'Ascend Timer Stopped',

        startS: 'Safety Stop Started',
        pauseS: 'Safety Stop Paused',
        resumeS: 'Safety Stop Resumed',
        stopS: 'Safety Stop Stopped',

        surfaced: 'Surface reached. Dive complete',

    }

    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='label'>Timer</Text>

                {/* Content goes inbetween ScrollView */}
                <Button style={styles.button} onPress={this.continueToSummary}status='success'>Continue to Summary</Button>

        </ScrollView>
        )
    }
}


Timer.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
        margin: 5
    }
  });
  