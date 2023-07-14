import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TProgressBar = ({ pct, color, m1, m2, valorMeta, valorMeta2 }) => {

  const square = {
    position: 'relative',
    width: 100 + '%',
    height: 100 + '%',    
    borderColor: '#193773',
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
  }
  const progressBar = {
    top: 0,
    height: 60,
    width: (pct*100) + '%',
    backgroundColor: color,
    position: 'absolute',
  }
  const jsjs = {
    position: 'relative',
    top: '-100%',
    left: '-35%',
    height: '150%',
    width: '150%',
    backgroundColor: '#193773',
    transform: [{ rotate: '168deg' }],
    zIndex: 2,
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
  /*const etiq3 = {
    left: (100) + '%',
  }*/
  const background = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100 + '%',
  }


  return (
    <View style={{position: 'relative', width: '100%', height: '100%'}}>
      <View style={square}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          start={{ x: 0.45, y: -0.9 }}
          style={background}
        />
        <View style={jsjs}/>
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
      {/*<Text style={[etiq, etiq2, etiq3]}>
        Record
      </Text>*/}
    </View>
  );
};

export default TProgressBar;