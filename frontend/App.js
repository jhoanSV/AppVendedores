import 'react-native-gesture-handler'
import { DrawerNavigation } from './src/navigation/DrawerNavigation.jsx';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function App() {
  return (
    
    <NavigationContainer style={ {marginTop: Constants.statusBarHeight, flexGrow: 1}}>
      <DrawerNavigation/>
    </NavigationContainer>)
}
