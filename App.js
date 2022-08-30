import 'react-native-gesture-handler'
import { DrawerNavigation } from './src/navigation/DrawerNavigation.jsx';
import { NavigationContainer } from '@react-navigation/native';
//import router from './src/routes/tasks';
export default function App() {
  return (

    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>)
}
