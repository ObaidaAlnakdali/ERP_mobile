import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  TouchableHighlight,
  View,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Pressable,
} from "react-native";
import axios from "axios";

export default function Employee({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const filterEmp = (text) => {
    if (text) {
      newData = employees.filter((employee) => {
        if (
          employee.first_name.toLowerCase().includes(text.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(text.toLowerCase())
        ) {
          return employee;
        }
      });
      setFilterEmployees(newData);
      setSearch(text);
    } else {
      setFilterEmployees(employees);
      setSearch(text);
    }
  };

  const getEmployees = () => {
    axios.get(`http://192.168.0.115:8000/api/employees`)
      .then(res => { 
        setEmployees(res.data.data);     
        setFilterEmployees(res.data.data)
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  const Item = ({ name, id }) => (
    <View style={styles.item}>
      <TouchableHighlight
        style={styles.edit}
        onPress={() => navigation.navigate("KPI", { id })}
      >
        <Image style={styles.edit} source={require("../assets/edit1.png")} />
      </TouchableHighlight>
      <Image style={styles.img} source={require("../assets/emp.jpg")} />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.btnBody}>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => navigation.navigate("KpiReport", { id })}
        >
          <Text style={styles.btnText}>KPI</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => navigation.navigate("ProjectReport", { id })}
        >
          <Text style={styles.btnText}>Project</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => navigation.navigate("GraphReport", { id })}
        >
          <Text style={styles.btnText}>Graph</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item name={item.first_name + " " + item.last_name} id={item.id} />
  );

  useEffect(async () => {
    await getEmployees();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        value={search}
        onChangeText={(text) => filterEmp(text)}
      />

{loading === true ?
          <Image
            style={styles.loadingLogo}
            source={require('../assets/loading2.gif')} />
        :
      <FlatList
        style={styles.body}
        data={filterEmployees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    width: "100%",
    paddingBottom: 50,
  },
  edit: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 50,
  },
  item: {
    margin: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    position: "relative",
  },
  title: {
    fontSize: 15,
    padding: 10,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginVertical: 15,
  },
  btnBody : {
    display:'flex',
    flexDirection:'row'
  },
  btn: {
    backgroundColor: "#8AB038",
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 8,
  },
  btnText: {
    color: "#ededed",
  },
  search: {
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 30,
    flexDirection: "row",
    borderColor: "#b4b4b4",
    borderWidth: 2,
    borderRadius: 25,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },  
  loadingLogo:{
    width:80,
    height:80,
    marginTop:200,
    marginBottom:30
  },
});
