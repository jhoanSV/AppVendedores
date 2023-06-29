import React, {useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image } from "react-native";

import { progressBar1 } from "../../assets";


const Main = () => {

    const dia = [
        'Dom',
        'Lun',
        'Mar',
        'Mie',
        'Jue',
        'Vie',
        'Sab',
    ];

    let hoy = new Date(Date.now());

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };

    const[metaDia, setMetaDia] =useState(2000000);
    const vendedor = ['Vendedor1']

    return (
        <SafeAreaView style={ { flexGrow: 1, padding: 15}}>
            <View style={ { alignItems: 'center'}}>
                <Text style={styles.itemText}>{vendedor}</Text>
            </View>
            <View style={{ width: '100%', aspectRatio: (1710/580)}}>
                <Image style={{ flex: 1, width: '100%', resizeMode: 'contain'}} source={ progressBar1 }/>
            </View>
            <View style={styles.containerMetaDia} >
                <Text style={styles.metaText}> Meta del dia</Text>
                <Text style={styles.metaValor}> $ {formatNumber(metaDia)}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20,justifyContent: 'space-between'}}>
                <View style={[styles.cirqlo, styles.borde]}>
                    <Text style={{ fontSize: 17 }}>
                        {dia[hoy.getDay()]}
                    </Text>
                </View>
                <View style={styles.proBar2}>
                    <View style={{width: '25%', height: 30, backgroundColor: 'green'}}/>
                </View>
            </View>
            <View>
                <Text>
                    jsjsjs
                </Text>
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
    containerMetaDia: {
        alignSelf: 'center',
        alignItems: 'center',
        width: 265,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#D9D9D9',
        elevation: 15,
    },
    metaText: {
        fontSize: 20,
        color: '#193773'
    },
    metaValor: {
        fontSize: 20,
        color: '#00000'
    },
    borde: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
    },
    cirqlo: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99999,
        backgroundColor: '#D9D9D9',
        elevation: 15
    },
    proBar2: {
        overflow: 'hidden',
        backgroundColor: '#ffff',
        width: 300,
        height: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
    }
})

export default Main;
