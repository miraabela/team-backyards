import React from 'react';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { StyleSheet, AsyncStorage } from 'react-native';

import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { Dive } from './screens/Dive';
import { Interval } from './screens/Interval';
import { Continue } from './screens/Continue';
import { History } from './screens/History';
import { Timer } from './screens/Timer';
import { SingleDivePage } from './screens/SingleDivePage';
import { DiveSummary } from './screens/DiveSummary';



export default function App() {

  state = {
    user: 'Admin',
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
        comments: '',
    },
    currentDive: {
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
    },
    diveHistory: []
}

  setData = async () => {
      try {
          AsyncStorage.setItem('userData', JSON.stringify(this.state))
      } catch (error) {
          console.log(error)
      }
  }

  handleEntrance = () => {
    AsyncStorage.clear()
    this.setData()
  }

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Router>
          <Stack key="root">
            {/* <Scene initial back key="Login" component={Login} title="Login" /> */}
            <Scene initial key="Home" component={Home} title="Home" onEnter={this.handleEntrance}/>
            <Scene lazy back key="Dive" component={Dive} title="Dive" />
            <Scene lazy back key="Interval" component={Interval} title="Interval" /> 
            <Scene lazy back key="Continue" component={Continue} title="Continue" />
            <Scene lazy back key="Timer" component={Timer} title="Timer" />
            <Scene lazy back key="History" component={History} title="History" />
            <Scene lazy back key="SingleDivePage" component={SingleDivePage} title="Dive Summary" />
            <Scene lazy back key="DiveSummary" component={DiveSummary} title="Dive Summary" />
          </Stack>
        </Router>
      </ApplicationProvider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});