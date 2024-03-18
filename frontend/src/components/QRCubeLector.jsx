import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-vision-camera';
import Svg, { Circle } from 'react-native-svg';

const QRCubeLector = () => {
  
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const cameraRef = useRef(null);
  const [qrCoordinates, setQrCoordinates] = useState(null);

  const onQRCodeRead = (event) => {
    const { bounds } = event;
    const { origin, size } = bounds;
    setQrCoordinates({ x: origin.x, y: origin.y, width: size.width, height: size.height });
  };


  useEffect(() => {(
    async () => {
      const { status } = await RNCamera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  },[]);

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        onBarCodeRead={onQRCodeRead}
        captureAudio={false}
      >
        <View style={styles.overlay} />
      </RNCamera>
      {qrCoordinates && (
        <Svg style={styles.svgContainer}>
          <Circle
            cx={qrCoordinates.x + qrCoordinates.width / 2}
            cy={qrCoordinates.y + qrCoordinates.height / 2}
            r={6}
            fill="red"
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'red',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default QRCubeLector;


