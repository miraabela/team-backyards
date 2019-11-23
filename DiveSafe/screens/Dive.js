import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, Input } from 'react-native-ui-kitten';


export class Dive extends React.Component {

    state = {
        user: "Username",
        lastdive: "24 hours",
        pressureGroup: "A",
        residualNitrogen: 0,
        plannedDive: {
            depth: -1,
            time: -1,
            pgroup: '',
            safetystop: false,
        }
    }

    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
            <Text category='h6'>Current Pressure Group: {this.state.pressureGroup}</Text>
            <Text category='h6'>Current Residual Nitrogen: {this.state.residualNitrogen}</Text>
            <Input label='DEPTH' placeholder='Enter depths below 42 meters.'
                value={this.state.plannedDive.depth}
                onChangeText={this.onChangeText}/>
             <Input label='BOTTOM TIME' placeholder='Enter bottom time.'
                value={this.state.plannedDive.time}
                onChangeText={this.onChangeText}/>
            <Button style={styles.button} status='info'>Calculate Plan</Button>
            <Text category='h5'>Planned Pressure Group: {this.state.plannedDive.pgroup}</Text>
            <Text category='h5'>Safety Stop: 
            {this.state.plannedDive.safetystop? 'Required at 5 meters for 3 minutes.' : 'Not Required'}</Text>
        </ScrollView>
        )
    }
}


Dive.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  