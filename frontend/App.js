import React,{useState, useEffect, useRef, Fragment } from 'react'
import 'react-native-gesture-handler'
import { DrawerNavigation } from './src/navigation/DrawerNavigation.jsx';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

    useEffect(() => {
    onFetchUpdateAsync();
    }, []);

  return (
    <NavigationContainer style={ {marginTop: Constants.statusBarHeight, flexGrow: 1}}>
      <DrawerNavigation/>
    </NavigationContainer>
    )}
