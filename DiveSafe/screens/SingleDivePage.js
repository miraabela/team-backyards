import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image, View, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux'


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
      actualDepth: '22', //planneddepth
      descend_time: '4',  //phases
      ascend_time: '4',  //phases
      date: new Date().toDateString(), //surfacedTime
      pGroup_starting: 'A',
      pGroup_ending: 'C',
      safetyStopMeters: '5',
      safetyStopMinutes: '3',
      editable: true,
      name: '',
    }
  }

  handleStarting = (text) => {
    this.setState({
      pGroup_starting: text,
    });
  }

  handleEnding = (text) => {
    this.setState({
      pGroup_ending: text,
    });
  }

  handleSafetyDepth = (text) => {
    this.setState({
      safetyStopMeters: text,
    });
  }

  handleSafetyTime = (text) => {
    this.setState({
      safetyStopMinutes: text,
    });
  }

  handleDescend = (text) => {
    this.setState({
      descend_time: text,
    });
  }

  handleAscent = (text) => {
    this.setState({
      ascend_time: text,
    });
  }

  finish = () => {
    Actions.History()
  }

    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            {/* <Text category='label'>Single Dive Page</Text> */}
            <View style={styles.chipContainer}>
              {/* <Button onPress={this.handleEdit} style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 10 }}>Edit</Button> */}
              <Text category='h3'>
                {this.state.location} Dive  
              </Text>
              <Text category='s1'>
                You dove up to {this.state.actualDepth} feet on {this.state.date}.
              </Text>
              <Text style={styles.sectionTitle} category='s1'>Pressure Group </Text>
              <ButtonsRow>
                <Text>Starting: </Text>
                  <TextInput 
                    value={this.state.pGroup_starting}
                    editable={this.state.editable}
                    onChangeText={this.handleStarting}
                    style={styles.chipsText}
                    >  
                                   
                  </TextInput>
                <Text>    Ending: </Text>
                <TextInput 
                  value={this.state.pGroup_ending}
                  editable={this.state.editable}
                  onChangeText={this.handleEnding}
                  style={styles.chipsText}>
                </TextInput>
              </ButtonsRow>
              <Text style={styles.sectionTitle} category='s1'>Time </Text>
              <ButtonsRow>
                <Text style={styles.labelText}>Descent: </Text>
                <TextInput 
                      value={this.state.descend_time}
                      editable={this.state.editable}
                      onChangeText={this.handleDescend}
                      style={styles.chipsText}>
                      
                </TextInput> 
                <Text> min</Text>
                <Text>    Ascent: </Text>
                <TextInput 
                    value={this.state.ascend_time}
                    editable={this.state.editable}
                    onChangeText={this.handleAscent}
                    style={styles.chipsText}>
                </TextInput>
                <Text style={styles.labelText}> min</Text>
              </ButtonsRow>

              {/* CHECK IF LAST DIVE SAFETYSOTP IS TRUE */}
              <Text style={styles.sectionTitle} category='s1'>Safety Stop </Text>
              <ButtonsRow>
                <Text>Depth: </Text>
                <TextInput 
                  value={this.state.safetyStopMeters}
                  editable={this.state.editable}
                  onChangeText={this.handleSafetyDepth}
                  style={styles.chipsText}>
                </TextInput>
                <Text> ft. </Text>
                <Text>    Time: </Text>
                <TextInput 
                    value={this.state.safetyStopMinutes}
                    editable={this.state.editable}
                    onChangeText={this.handleSafetyTime}
                    style={styles.chipsText}>
                </TextInput>
                <Text> min</Text>
              </ButtonsRow>
              <Button onPress={this.finish}>Done</Button>
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
      paddingRight:20,
      paddingTop: 15,
      paddingBottom: 30,
    },
    buttonsRow: {
      flexDirection: 'row',
      marginBottom: 20,
      paddingLeft: 20,
    },
    chipsText: {
      fontSize: 14,
      color: '#1e1e24',
      fontWeight: 'bold',
      padding: 3,
      backgroundColor: '#d3d3eb',
    },
    sectionTitle: {
      margin: 10,
      fontWeight: 'bold',
      fontSize: 20,
      color: '#120fd6',
      paddingTop: 15,
    },
  });
  