import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Image, FlatList, StyleSheet, Text, StatusBar, Button, Pressable } from 'react-native';
import axios from 'axios';


export default function Employee() {

  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true)

  const searchText = async (e) => {
    const value = e.target.value;
    const data = employees;

    data = await data.filter((val) => {
      if (value === '') {
        return val
      } else if ((val.first_name.toLowerCase().includes(value.toLowerCase())) || (val.last_name.toLowerCase().includes(searchValue.toLowerCase()))) {
        return val
      }
    })
    setEmployees(data)
    console.log(data)
   };

  const Item = ({ name }) => (
    <View style={styles.item}>
      <Pressable style={styles.edit} >
      <Image
        style={styles.edit}
        source={require('../assets/edit1.png')}
      />
      </Pressable>
      <Image
        style={styles.img}
        source={require('../assets/emp.jpg')}
      />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.btnBody}>
        <Pressable style={styles.btn} >
          <Text style={styles.btnText}>KPI</Text>
        </Pressable>
        <Pressable style={styles.btn} >
          <Text style={styles.btnText}>Project</Text>
        </Pressable>
        <Pressable style={styles.btn} >
          <Text style={styles.btnText}>Graph</Text>
        </Pressable>
       
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item name={item.first_name + ' ' + item.last_name} />
  );

  const getEmployees = () => {
    axios.get(`http://192.168.0.135:8000/api/employees`)
      .then(res => { setEmployees(res.data.data); console.log(res.data.data) })
      .catch(err => console.log(err))
  }

  useEffect(async () => {
    await getEmployees();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
          style={styles.search}
          placeholder="Search"
          onChange={searchText}
        />
        <FlatList
          style={styles.body}
          data={employees}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical:20,
    alignItems: 'center',
    flex:1,
  },
  body: {
    paddingHorizontal:20,
    width: '100%',
    paddingBottom:50
  },
  edit: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 5,
    top: 5,
    borderRadius: 50
  },
  item: {
    margin:10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
  },
  title: {
    fontSize: 15,
    padding: 10,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginVertical:15,
  },
  btnBody : {
    display:'flex',
    flexDirection:'row-reverse'
  },
  btn: {
    backgroundColor:'#8AB038',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin:5,
    borderRadius:8,
  },
  btnText: {
    color: '#ededed',
  },
  search: {
    width: "80%",
    marginBottom: 10,
    paddingVertical:5,
    paddingHorizontal:30,
    flexDirection: "row",
    borderColor: '#b4b4b4',
    borderWidth: 2,
    borderRadius: 25,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});