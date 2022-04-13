import React from 'react'
import { useState, useEffect } from 'react';
import { SafeAreaView, TouchableHighlight, View, TextInput, Image, FlatList, StyleSheet, Text, StatusBar, Button, Pressable } from 'react-native';
import axios from 'axios';

const Item = ({ title }) => (
  <View >
    <Text>{title}</Text>
  </View>
);

function KPI({ route }) {
  const { id } = route.params;

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  const [newkpi, setNewKpi] = useState({ name: '' });
  const [kpiList, setKpiList] = useState([]);

  const handleChangeKpi = (e) => {
    setNewKpiKpi({ name: e });
  }

  const getKpiEmployee = async () => {
    await axios.get(`http://172.20.10.2:8000/api/employees/${id}`).then(response => {
      setKpiList(response.data.data.kpi)
      console.log(response.data.data.kpi);
    })
  }
  const handleSubmitKpi = async () => {
    await axios.post(`http://172.20.10.2:8000/api/kpi/`, newkpi).then(response => {
      console.log(response.message);
      setNewKpi({ name: '' });
    })
  }

  // const getKpi = () => {
  //   axios.get(`http://192.168.0.143:8000/api/kpi`)
  //     .then(res => {
  //       console.log(res.data.data);
  //     })
  //     .catch(err => console.log(err))
  // }

  useEffect(() => {
    getKpiEmployee()
  }, []);

  return (
    <SafeAreaView>
      <Text>KPI empId: {JSON.stringify(id)}</Text>

      <FlatList
        style={styles.body}
        data={kpiList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.item}>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeKpi}
          value={newkpi.name}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />

        <TouchableHighlight style={styles.btn}
          onPress={handleSubmitKpi}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableHighlight>

        {/* <TouchableHighlight style={styles.btn}
          onPress={getKpi}
        >
          <Text style={styles.btnText}>get</Text>
        </TouchableHighlight> */}

      </View>

      <View style={styles.item}>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeKpi}
          value={newkpi.name}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />

        <TouchableHighlight style={styles.btn}
          onPress={handleSubmitKpi}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableHighlight>

        {/* <TouchableHighlight style={styles.btn}
          onPress={getKpi}
        >
          <Text style={styles.btnText}>get</Text>
        </TouchableHighlight> */}

      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  item: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
    flexDirection: 'row'
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    // outlineStyle: "none",
  },
  btn: {
    backgroundColor: '#8AB038',
    paddingVertical: 5,
    // paddingHorizontal: 10,
    margin: 5,
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  body: {
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 50
  },
})

export default KPI