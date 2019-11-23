import React from 'react';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';


import { Home } from './screens/Home';
import { HomeTabIcon } from './components/nav/HomeTabIcon';


export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Router>
          <Stack key="root">
            <Scene key="home" component={Home} title="Home" />
            <Scene key="register" component={Register} title="Register" />
            <Scene key="home" component={Home} />
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
