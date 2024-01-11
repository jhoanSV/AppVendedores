import React, {useState, useEffect} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import { getTasks, SearchTasks } from '../api';
import TaskList from '../components/TaskList';
import Layout from '../components/Layout';
import { TouchableOpacity } from "react-native-gesture-handler";


const LPrecios = () => {
  const [tasks, setTasks] = React.useState([]);
  const [pro, setPro] = React.useState([]);
  const [search, setSearch] = useState({
    Search: ''
  });

  const loadTasks = async() => {
    const data = await getTasks();
    setTasks(data);
    setPro(data);
  };
  
  const searchTasks = async(text) => {
    /*const data = await getTasks(text);*/
    const data = pro
    const filtro = data.filter((data) => data.cod.toLowerCase().includes(text)||data.Descripcion.toLowerCase().includes(text) || data.SubCategoria.toLowerCase().includes(text))
    setTasks(filtro);
  };



  const searchProduct = async (text) => {
    /*Searh the list of products that includes the text, either because it is in the "products" table or in the "alias" table */
    const proData = pro; //The whole table "products".
    const aliasData = alias; //The whole table "alias".
    // Define a case-insensitive text filter function
    const filterByText = (item) =>
      item.cod.toLowerCase().includes(text) ||
      item.Descripcion.toLowerCase().includes(text) ||
      item.SubCategoria.toLowerCase().includes(text);
    // Filter products based on the text
    const TFiltro1 = proData.filter(filterByText);
    // Filter aliases based on the text
    const TFiltro2 = aliasData.filter((item) => item.Alias.toLowerCase().includes(text));
    // Extract unique cod values from aliasData
    const CodAlias = [...new Set(TFiltro2.map((item) => item.cod))];
    // Filter products based on unique cod values
    const aliasProducts = proData.filter((item) => CodAlias.includes(item.cod));
    // Extract unique cod values from aliasProducts
    const uniqueAliasProducts = [...new Set(aliasProducts.map((item) => item.cod))];
    // Combine the unique cod values from TFiltro1 and aliasProducts
    const filtro = [...new Set([...TFiltro1, ...uniqueAliasProducts])];
    setTasks(filtro);
  };

  useEffect(()=> {
    loadTasks()
  },[])
   
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
        onChangeText={(text)=> handleSubmit(text.toLowerCase())}
      />
        <View style={styles.container}>
          <Text style={[styles.text, {width: 80, margin: 5}]}>Cod</Text>
          <Text style={[styles.text, {width: 400, margin: 5}]}>Descripción</Text>
          <Text style={[styles.text, {width: 95, margin: 5}]}>Empaque</Text>
          <Text style={[styles.text, {width: 100, margin: 5}]}>V. Unitario</Text>
          <Text style={[styles.text, {width: 200, margin: 5}]}>Sub categoria</Text>
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