import React, {useState} from "react";
import {StyleSheet, Text, View, Modal, TouchableOpacity} from "react-native";

const Warning = ({visible, title, warningText, setMostrar}) =>{
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal]}>
            <View style={[{flexDirection: 'row', backgroundColor: '#D6320E', borderBottomColor: '#F2CB05', borderBottomWidth: 6}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>{title}</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setMostrar(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#D6320E'}]}>{warningText}</Text>
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
    width: 300,
    height: 300,
  },
});

export default Warning;