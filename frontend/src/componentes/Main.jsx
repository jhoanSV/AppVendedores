import React, {useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image } from "react-native";




const Main = () => {

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };

    const[bla, setBla] =useState(4500)
    return (
        <SafeAreaView style={ { flexGrow: 1, padding: 15}}>
            <View style={ { alignItems: 'center'}}>
                <Text style={styles.itemText}>Vendedor1</Text>
            </View>
            <View>
                <Text>progreso c:</Text>
            </View>
            <View >
                <Text> meta:</Text>
                <Text> $ {formatNumber(bla)}</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    itemText: {
        color: '#193773',
        fontSize: 20,
        fontWeight: 'bold'
    },

})

export default Main;
