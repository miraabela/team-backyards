import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Actions } from 'react-native-router-flux';


export class DiveCard extends React.Component {

    state = {
        diveHistory: [
            {}
        ]
    }

    aDive = {
        depth: '',
        time: '',
        date: '',
        pGroup: '',
        safetyStop: '',
        location: '',
    }
    testDive = {
        depth: 10,
        time: '25',
        date: new Date().toDateString(),
        pGroup: '',
        safetyStop: '',
        location: 'Honolulu',
    }

    render(){
        return (
            <TouchableOpacity activeOpacity={0.80} onPress={() => Actions.SingleDivePage({dive: this.props.dive})}>
                <ImageBackground style={styles.container} source={require('../assets/underwater.jpg')}>
                    <View style={styles.overlay}>
                        <View  style={styles.chipContainer}>
                            <Text style={styles.levelLabel} category='h5'> 
                                {this.props.dive.date}
                            </Text>
                        </View>

                        <View style={styles.chipContainer}>
                            <Text style={styles.chipsText} category='s1'>
                            {this.props.dive.location}  
                            </Text>
                            <Text style={styles.chipsText} category='s1'>
                            {this.props.dive.actualDepth} meters
                            </Text>
                            <Text style={styles.chipsText} category='s1'>
                            {this.props.dive.actualTime} minutes
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}


DiveCard.propTypes = {
    dive: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
        height: 100,
        padding: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignContent: 'center',
        overflow: 'hidden',
        flexDirection: 'row',
        marginVertical: 8,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'flex-start',
    
    },
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop:4,
        borderRadius: 100,
      },
      levelLabel: {
        color: 'white',
        marginLeft: 10,
        marginBottom: -10,
    },
    chipsText: {
        color: 'white',
        margin: 10,
    },
  });
  