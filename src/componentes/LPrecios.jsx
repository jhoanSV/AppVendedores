import React, {useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, ImageBackground } from "react-native";

const LPrecios = () => {
  return (
    
    <SafeAreaView style={ {marginTop: Constants.statusBarHeight, flexGrow: 1}}>
        <Text>Lista de precios</Text>           
    </SafeAreaView>
  );
};

export default LPrecios;