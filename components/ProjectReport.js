import React from 'react'
import { useState, useEffect } from 'react';
import { SafeAreaView, TouchableHighlight, View, Item, TextInput, Image, FlatList, StyleSheet, Text, StatusBar, Button, Pressable } from 'react-native';
import axios from 'axios';

function ProjectReport({ route }) {
  const [dataReport, setDataReport] = useState([])
  const [employee, setEmployee] = useState([])
  useEffect(() => {
    axios.get(`http://192.168.0.124:8000/api/employees/reportProject/${id}`)
      .then(response => {
        console.log(response)
        // console.log(response.data.data.projec_report.role[0])
        setDataReport(response.data.data.projec_report)
      })
    axios.get(`http://192.168.0.124:8000/api/employees/${id}`)
      .then(response => {
        setEmployee(response.data.data)
      })
  }, [])
  const Item = ({ name, id, role }) => (
    <View style={styles.item}>
      <Text

        style={styles.title}>
        {name}
      </Text>

      <Text
        style={styles.role}>
        {role}</Text>

    </View>
  );
  const { id } = route.params;
  const renderItem = ({ item }) => (
    <Item name={item.name} role={item.role[0].rolename} id={item.id} />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/**<Text>ProjectReport empId: {JSON.stringify(id)}</Text> */}
      <Text>Projects and roles of  {employee.first_name + ' ' + employee.last_name}</Text>
      <View style={styles.navView}>
        <Text style={styles.navItem} >Project</Text>
        <Text style={styles.navItem} >Role</Text>
      </View>
      <FlatList
        style={styles.body}
        data={dataReport}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>

  )
}

export default ProjectReport


const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 50
  },
  item: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
    height: 80,
    borderRadius: 30
  },
  title: {
    fontSize: 12,
    padding: 10,
    backgroundColor: '#b6d96ebf',
    color: '#39451f',
    position: 'absolute',
    position: 'absolute',
    left: 0,
    width: 150,
    height: 40,
    borderBottomRightRadius: 25,
    // textAlign: 'center',
  },
  role: {
    color: 'white',
    fontSize: 12,
    padding: 10,
    backgroundColor: '#d4aa2b',
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 35,
    width: '40%',
    // textAlign: 'right',
    borderTopLeftRadius: 25
  },
  navView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 18,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  navItem: {
    color: '#39451f',
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 10
  }
});
