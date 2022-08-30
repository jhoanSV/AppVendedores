import react from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../componentes/Main';
import LogIn from '../componentes/LogIn';

const Drawer = createDrawerNavigator()

export function DrawerNavigation(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Main" component={ Main }/>
            <Drawer.Screen name="LogIn" component={ LogIn }/>
        </Drawer.Navigator>
    )
}

const MenuItems = ({ navigation }) =>{
    return (
        <DrawerContentScrollView>
            <text>Hola</text>
        </DrawerContentScrollView>
    )
}