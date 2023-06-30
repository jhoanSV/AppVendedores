import React, {useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image } from "react-native";

import { progressBar1 } from "../../assets";


const Main = () => {

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };

    const[metaDia, setMetaDia] =useState(2000000);
    const vendedor = ['Vendedor1']

    return (
        <SafeAreaView style={ { flexGrow: 1, padding: 15}}>
            <View style={ { alignItems: 'center'}}>
                <Text style={styles.vendedorText}>{vendedor}</Text>
            </View>
            <View style={{ width: '100%', aspectRatio: (1710/580)}}>
                <Image style={{ flex: 1, width: '100%', resizeMode: 'contain'}} source={ progressBar1 }/>
                <View style={ styles.proBarTextContainer}>
                    <Text style={styles.progressBarText}>
                        x%
                    </Text>
                </View>
                <View style={ styles.triangleCorner }>
                    <Text>
                        jsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjs
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    vendedorText: {
        color: '#193773',
        fontSize: 20,
        fontWeight: 'bold'
    },
    proBarTextContainer: {
        position: 'absolute', 
        width: 60,
        height: 60,
        left: 26,
        bottom: 34.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarText: {
        color: '#193773',
        fontSize: 22,
        fontWeight: 'bold'
    },
    triangleCorner: {
        width: 100,
        height: 100,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 50,
        borderTopWidth: 50,
        borderRightColor: "transparent",
        borderTopColor: "white",
        transform: [{ rotate: "180deg" }],
    },
})

export default Main;
