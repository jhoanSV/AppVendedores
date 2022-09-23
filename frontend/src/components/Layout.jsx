import react from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';


const Layout = ({ children }) => {
    return <ScrollView horizontal={true}>
        <View style={styles.container}>
            <StatusBar/>
            {children}
        </View>
        </ScrollView>
}

const styles = StyleSheet.create({
inputText: {
    fontWeight: 'bold',
    paddingBottom: 5,
    color:  '#FFFF',
},
container: {
    backgroundColor: '#222f3e',
    padding: 10,
    flex: 1,
},
buttonYellow: {
    width: 255,
    Color: '#F2CB05',
    borderRadius: 40,
    margin: 4,
},
buttonBlueLight: {
    backgroundColor: '#D0D9F2', 
    borderRadius: 40, 
    margin: 4,
},
});

export default Layout;