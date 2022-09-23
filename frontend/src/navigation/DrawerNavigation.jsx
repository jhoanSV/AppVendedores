import react from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Main from '../componentes/Main';
import LPrecios from '../componentes/LPrecios';
import DetalleProducto from '../componentes/DetalleProducto';
import LogIn from '../componentes/LogIn';

import { Text, StyleSheet, Icon } from 'react-native';
import MenuButtonItem from '../components/MenuButtonItem';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Drawer = createDrawerNavigator()

export function DrawerNavigation(){
    return (
        <Drawer.Navigator 
            backBehavior="history"
            drawerContent={(props) => <MenuItems{...props} />}>
            <Drawer.Screen
                name="LogIn" 
                component={ LogIn }
                options={{
                    title: 'Pantalla de inicio',
                    headerStyle: {backgroundColor: '#193773'},
                    headerTitleStyle: {color: '#FFFF'},
                    headerShown: false,
            }}/>
            <Drawer.Screen
                name="Main" 
                component={ Main }
                options={{
                    title: 'Pantalla de inicio',
                    headerStyle: {backgroundColor: '#193773'},
                    headerTitleStyle: {color: '#FFFF'},
            }}/>
            <Drawer.Screen 
                name="LPrecios" 
                component={ LPrecios } 
                options={{
                    title: 'Lista de precios',
                    headerStyle: {backgroundColor: '#193773'},
                    headerTitleStyle: {color: '#FFFF'},
            }}/>
            <Drawer.Screen
                name="DetalleProducto" 
                component={ DetalleProducto }
                icon = "home"
                options={{
                    title: 'Detalle del producto',
                    headerStyle: {backgroundColor: '#193773'},
                    headerTitleStyle: {color: '#FFFF'},
                    //navigationOptions: {icon: 'home' },
            }}/>
        </Drawer.Navigator>
    )
}

const MenuItems = ({ navigation }) =>{
    return (
        <DrawerContentScrollView 
            style={styles.container}
        >
            <Text style={styles.title}>Menú</Text>
            <MenuButtonItem 
                text = "Pantalla de inicio"
                onPress={() => navigation.navigate('Main')}
                icon = "home"
            />
            <MenuButtonItem 
                text = "Lista de precios"
                onPress={() => navigation.navigate('LPrecios')}
                icon = "list"
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#193773'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    item: {
        
    }
})
