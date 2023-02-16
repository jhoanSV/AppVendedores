import React, {useState} from "react";
import {StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalCargando = ({visible, children}) => {
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal, { justifyContent: 'center', alignItems: 'center', borderRadius: 60 }]}>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#193773'}]}>Enviando...</Text>
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
    text: {
      fontSize: 16,  
      marginLeft: 8,
      color: 'black',
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
  
    buttonLogin : {
      borderRadius: 40, 
      margin: 4,
      position: 'relative',
      bottom: windowHeight*0.07,
      width: windowWidth*0.827,//290,
      backgroundColor: '#D6320E'
    },
    logo: {
        position: 'relative',
        width: windowWidth*0.77,//270,
        height: windowHeight*0.392, //270,
      },
  });
  
  export default Warning;