import React from 'react';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { StyleSheet, AsyncStorage } from 'react-native';


import { Home } from './screens/Home';
import { Dive } from './screens/Dive';
import { History } from './screens/History';
import { Timer } from './screens/Timer';


export default function App() {
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
  AsyncStorage.setItem('userData', JSON.stringify(state))


  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Router>
          <Stack key="root">
          
            <Scene initial key="Home" component={Home} title="Home" />
            <Scene lazy back key="Dive" component={Dive} title="Dive" />
            <Scene lazy back key="Timer" component={Timer} title="Timer" />
            <Scene lazy back key="History" component={History} title="History" />

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
