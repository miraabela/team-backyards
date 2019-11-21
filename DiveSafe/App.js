import React from 'react';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import { StyleSheet, } from 'react-native';


import { Home } from './screens/Home';
import { HomeTabIcon } from './components/nav/HomeTabIcon';


export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Router>
          <Stack key='root' titleStyle={{ alignSelf: 'center' }} >
            <Scene hideNavBar panHandlers={null}>
            <Tabs key="tabbar" activeTintColor="#000000" routeName="tabbar" backToInitial >
            <Stack initial key="Home" title="Home" 
            inactiveBackgroundColor="#919191" activeBackgroundColor="#000000" icon={HomeTabIcon}>
               <Scene initial key="Home" title="Home" component={Home}/>
            </Stack>
            </Tabs>
            </Scene>
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
