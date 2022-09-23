import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';

const MenuButtonItem = ({ text, onPress, icon }) => {
  return (
    <TouchableOpacity
        style={styles.buttonContainer}    
        onPress={onPress}
    >
      <Icon name={icon} size={20} color="#F2CB05" padding = {10} />
      <Text style={styles.text}>{ text }</Text>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#193773',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
})

export default MenuButtonItem