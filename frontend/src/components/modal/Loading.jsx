import React, {useState} from "react";
import {StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, Image} from 'react-native';
import { progress } from '../../../assets';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loading = ({visible, mensaje}) => {
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal, { justifyContent: 'center', alignItems: 'center', borderRadius: 60 }]}>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#193773'}]}>{mensaje}</Text>
            <Image style={[styles.logo]} source={ progress } resizeMode='contain' />
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    subTitle: {
      fontSize: 20, 
      fontWeight: 'bold', 
      margin: 8,
      color: '#193773',
    },
      ModalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contenedorModal: {
      backgroundColor: '#FFFF',
      width: windowWidth*0.85, //300,
      height: windowHeight*0.436,//300,
    },
    logo: {
        position: 'relative',
        width: windowWidth*0.77,//270,
        height: windowHeight*0.392, //270,
      },
  });
  
  export default Loading;