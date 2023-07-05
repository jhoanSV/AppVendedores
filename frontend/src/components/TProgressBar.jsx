import React from 'react';
import { View, Text } from 'react-native';

const TProgressBar = ({ pct, width, height, color }) => {

  const square = {
    height: height,
    width: width,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
  }
  const progressBar = {
    top: -125,
    height: 60,
    width: (pct*100) + '%',
    backgroundColor: color,
    position: 'relative',
  }
  const jsjs = {
    position: 'relative',
    top: -100,
    left: -24,
    height: 120,
    width: 300,
    backgroundColor: '#193773',
    transform: [{ rotate: '168deg' }],
    zIndex: 2,        
  }
  return (
    /*<View style={progressStyle}>*/
    <>
      <View style={square}>
        <View style={jsjs}/>
        <View style={progressBar}/>
      </View>
    </>
    /*</View>*/
  );
};

export default TProgressBar;