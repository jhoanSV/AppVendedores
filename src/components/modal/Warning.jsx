import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Warning({visible, title, warningText, setMostrar, ConfirmationText, SetConfirmation, ColorHeader, ColorText}) {
  const [colorHeader, setColorHeader] = useState('#D6320E')
  const [colorText, setColorText] = useState('#D6320E')

  const NewVariables =()=>{
    if (typeof ColorHeader !== 'undefined' && typeof ColorText !== 'undefined'){
      setColorHeader(ColorHeader)
      setColorText(ColorText)
    }
  }

  useEffect(() => {
    NewVariables();
  }, [ColorHeader, ColorText]); // Run NewVariables whenever ColorHeader or ColorText changes

  
  return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal]}>
            <View style={[{flexDirection: 'row', backgroundColor: colorHeader, borderBottomColor: '#F2CB05', borderBottomWidth: 6}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>{title}</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setMostrar(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  colorText}]}>{warningText}</Text>
            </View>
            <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: colorHeader}]} onPress={()=>{SetConfirmation(),setMostrar(false)}}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>{ConfirmationText}</Text>
            </TouchableOpacity>
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
});

/*export default Warning;*/