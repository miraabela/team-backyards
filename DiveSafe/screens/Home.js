import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image, AsyncStorage, Alert } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';


export class Home extends React.Component {

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

  render(){
    if (this.state.isLoading) {
      return <Text category='h2'>Loading...</Text>
    }

    return (
    <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
    alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
        <Text category='h3'>Welcome, {this.state.data.user}</Text> 
        <Text category='s1'>Time since last dive: </Text>
        <Text category='h5'>{this.state.data.lastdive.surfaceInterval == '' ? '24+ hours': this.state.data.lastdive.residualNitrogen}</Text>
        <Text category='s1'>Current pressure group:  </Text>
        <Text category='h5'>{this.state.data.lastdive.pGroup == '' ? 'A': this.state.data.lastdive.pGroup}</Text>
        <Text category='s1'>Residual nitrogen: </Text>

        <Text category='h5'>{this.state.data.lastdive.residualNitrogen == '' ? '0': this.state.data.lastdive.residualNitrogen}</Text>
        <Button style={styles.button} onPress={Actions.Dive} status='info'>Start Dive</Button>
        <Button style={styles.button} onPress={Actions.History} status='info'>See History</Button>
    </ScrollView>
    )
  }
}


Home.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    button: {
      margin: 5
    }
  });
  