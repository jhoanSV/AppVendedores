import React from 'react';
import { View, Text } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';

const TProgressBar = ({ pct, color, m1, m2, valorMeta, valorMeta2 }) => {

  const square = {
    position: 'relative',
    width: 100 + '%',
    height: 100 + '%',
    borderStyle: 'solid',
    borderColor: '#193773',
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
  const shad = {
    position: 'absolute',
    top: -94,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  }
  const bar1 = {
    position: 'absolute',
    left: (m1*100) + '%',
    width: 2,
    height: 60,
    backgroundColor: 'black',
    zIndex: 1,
  }
  const bar2 = {
    width: 1.5,
    left: (m2*100) + '%',
  }
  const etiq = {
    position: 'absolute',
    top: '110%',
    left: (m1*100) + '%',
    marginLeft: -12,
    zIndex: 3,
    fontSize: 12,
  }
  const etiq2 = {
    left: (m2*100) + '%',
  }
  const etiq3 = {
    left: (100) + '%',
  }

  return (
    <View style={{position: 'relative'}}>
      <View style={square}>
        <View style={jsjs}/>
        <View style={[jsjs, shad]}/>
        <View style={progressBar}/>
        <View style={bar1}/>
        <View style={[bar1, bar2]}/>
      </View>
      <Text style={etiq}>
        {valorMeta}
      </Text>
      <Text style={[etiq, etiq2]}>
        {valorMeta2}
      </Text>
      <Text style={[etiq, etiq2, etiq3]}>
        Record
      </Text>
    </View>
  );
};

export default TProgressBar;