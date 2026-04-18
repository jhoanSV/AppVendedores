import React, { useEffect, useState } from 'react'
import {View,
        Text,
        StyleSheet,
        Button,
        ScrollView} from 'react-native';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import { getGlobal } from '../components/context/user';

function Flatlist({ Header, Data }) {
    return (
        <View>
            {Header.map((item)=>{
                <Text>{item.header}</Text>
            })}
            <ScrollView>
                {Data.map((item)=>{
                    
                })}
            </ScrollView>
        </View>
    )
}