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
import { Continue2 } from './screens/Continue2';
import { History } from './screens/History';
import { Timer } from './screens/Timer';
import { SingleDivePage } from './screens/SingleDivePage';
import { SingleDivePage2 } from './screens/SingleDivePage2';

import { DiveSummary } from './screens/DiveSummary';
import { DiveTimer } from './screens/DiveTimer';



export default function App() {

state = {
  user: { // update on Home, update on Dive page entrance. 
    timeSince: null, // minutes since last dive
    lastPG: '', //None if divehistory is []
    currentPG: '', //calculate from Interval. A if divehistory is []
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
    startingPG: '', //same as user.currentPG
    endingPG: '', //same as plannedDive.newPGroup
    plannedDepth: 0,
    plannedTime: 0,
    surfacedTime: '', //new Date toString when finish button is pressed
    phases: [],
    totalTime: 0, //summary of phases
    safety_stop: false,
    location: '',
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
            <Scene lazy back key="Continue2" component={Continue2} title="Continue" />
            <Scene lazy back key="Timer" component={Timer} title="Timer" />
            <Scene lazy back key="DiveTimer" component={DiveTimer} title="Dive Timer" />
            <Scene lazy back key="History" component={History} title="History" />
            <Scene lazy back key="SingleDivePage" component={SingleDivePage} title="Dive Summary" />
            <Scene lazy back key="SingleDivePage2" component={SingleDivePage2} title="Dive Summary" />
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