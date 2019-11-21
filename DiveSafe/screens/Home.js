import React from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ScrollView, Text , Image } from 'react-native';


export class Home extends React.Component {


    render(){
        return (
        <ScrollView style={styles.container} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false} {...this.props}>
                <Image style={{flex:1}} source={require('../assets/new1.png')}/>
        </ScrollView>
        )
    }
}


Home.propTypes = {}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  