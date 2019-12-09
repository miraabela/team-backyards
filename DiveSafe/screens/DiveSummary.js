import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux'


// summary after timer. access most recent dive through  storage divehistory[divehistory.length-1]

export class DiveSummary extends React.Component {

  state = {data: {}, isLoading: true}

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

  finish = () => {
    Actions.History()
  }

    render(){

      if (this.state.isLoading) {
        return <Text category='h2'>Loading...</Text>
    }

        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>

            <Text category='s1'>Ending Pressure Group:</Text>
            <Text category='h5'>{this.state.data.currentDive.endingPG}</Text> 

            <Text category='s1'>Depth:</Text>
            <Text category='h5'>{this.state.data.currentDive.depth.toString()}</Text> 

            <Text category='s1'>Bottom Time:</Text>
            <Text category='h5'>{this.state.data.currentDive.phases[this.state.data.currentDive.phases.length-1].toString()} ms</Text> 

            <Text category='s1'>Total Time:</Text>
            <Text category='h5'>{this.state.data.currentDive.totalTime.toString()} ms</Text> 

            <Text category='s1'>Safety Stop:</Text>
            <Text category='h5'>{this.state.data.currentDive.safety_stop.toString()}</Text> 

            <Text category='s1'>Location:</Text>
            <Text category='h5'>{this.state.data.currentDive.location}</Text> 

            <Button onPress={this.finish}>Done</Button>


        </ScrollView>
        )
    }
}


DiveSummary.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  