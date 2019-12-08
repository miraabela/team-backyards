import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image, View, TextInput, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

export class SingleDivePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Honolulu',
      actualDepth: '22',
      descend_time: '4', 
      ascend_time: '4', 
      date: new Date().toDateString(),
      actualTime: 30,
      pGroup_starting: 'A',
      pGroup_ending: 'C',
      safetyStopMeters: '5',
      safetyStopMinutes: '3',
    }
  }

    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            {/* <Text category='label'>Single Dive Page</Text> */}
            <View style={styles.chipContainer}>
              <Text category='h3'>
              {this.state.location} Dive  
              </Text>
              <Text style={styles.chipsText} category='s1'>
              {this.state.date}  
              </Text>
              <Text style={styles.sectionTitle} category='s1'>Pressure Group </Text>
              <ButtonsRow>
                <Text style={styles.chipsText} category='s1'>
                Ending: {this.state.pGroup_ending} 
                </Text>
                <Text style={styles.chipsText} category='s1'>
                Starting: {this.state.pGroup_starting} 
                </Text>
              </ButtonsRow>
              <Text style={styles.sectionTitle} category='s1'>Time </Text>
              <ButtonsRow>
                <Text style={styles.chipsText} category='s1'>
                Descend Time: {this.state.descend_time} minutes
                </Text>
                <Text style={styles.chipsText} category='s1'>
                Ascend Time: {this.state.ascend_time} minutes
                </Text>
              </ButtonsRow>
              <Text style={styles.sectionTitle} category='s1'>Safety Stop </Text>
              <ButtonsRow>
                <Text style={styles.chipsText} category='s1'>
                Depth: {this.state.safetyStopMeters} meters
                </Text>
                <Text style={styles.chipsText} category='s1'>
                Time: {this.state.safetyStopMinutes} minutes
                </Text>
              </ButtonsRow>
              <Text style={styles.sectionTitle} category='s1'>Depth </Text>
              <ButtonsRow>
                <Text style={styles.chipsText} category='s1'>
                Depth: {this.state.actualDepth} meters
                </Text>
              </ButtonsRow>
            </View>
        </ScrollView>
        )
    }
}


SingleDivePage.propTypes = {
  dive: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingTop: 20,
    },
    buttonsRow: {
      flexDirection: 'column',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      // marginTop: 20,
      // alignItems: 'flex-end',
      marginBottom: 30,
      paddingLeft: 20,
    },
    chipsText: {
      margin: 10,
      fontSize: 14,
      color: '#1e1e24',
    },
    sectionTitle: {
      margin: 10,
      fontWeight: 'bold',
      fontSize: 20,
      color: '#120fd6',
      paddingTop: 15,
    },
  });
  