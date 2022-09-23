import React, {useState, useEffect} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import { getTasks, SearchTasks } from '../api';
import TaskList from '../components/TaskList';
import Layout from '../components/Layout';
import { TouchableOpacity } from "react-native-gesture-handler";


const LPrecios = () => {
  const [tasks, setTasks] = React.useState([]);

  const [search, setSearch] = useState({
    Search: ''
  });

  const loadTasks = async() => {
    const data = await getTasks();
    setTasks(data);
  };
  
  const searchTasks = async(text) => {
    const data = await SearchTasks(text);
    setTasks(data);
  };

  useEffect(()=> {
    loadTasks()
  },[])
  
  

  const handleChange = (name, value)=> setSearch({...search, [name]: value}) ;

  const handleSubmit = (text) => {
    if (text === ''){
      loadTasks()
    } else {
    searchTasks(text)
    }
  };

  return (
    
    <Layout>
      <TextInput 
        style={ styles.input }
        placeholder="Buscar..."
        onChangeText={(text)=> handleSubmit(text)}//handleChange('Search',text) }
      />
        <View style={styles.container}>
          <Text style={[styles.text, {width: 80, margin: 5}]}>Cod</Text>
          <Text style={[styles.text, {width: 400, margin: 5}]}>Descripción</Text>
          <Text style={[styles.text, {width: 95, margin: 5}]}>Empaque</Text>
          <Text style={[styles.text, {width: 200, margin: 5}]}>Sub categoria</Text>
          <Text style={[styles.text, {width: 100, margin: 5}]}>V. Unitario</Text>
          <Text style={[styles.text, {margin: 5}]}>Nota</Text>
        </View>
        <TaskList tasks={tasks}/>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#193773',
    borderBottomColor: '#F2CB05', 
    borderBottomWidth: 5,
    padding: 5
},
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#FFFF',
  },
  input: {
    height: 40,
    width: 700,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
    borderRadius: 40,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 2
  },
})

export default LPrecios;