

import React from 'react'
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, TouchableHighlight, View, TextInput, Image, FlatList, StyleSheet, Text, StatusBar, Button, Pressable } from 'react-native';
import axios from 'axios';

const Item = ({ name, rate, id, kpiList, kpi_id }) => {
  // const { id } = route.params;
  const [selectedValue, setSelectedValue] = useState(rate);
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    kpi_id: "",
    rate: "",
  });

  const finalFunction = async () => {
    await axios.get(`http://192.168.1.109:8000/api/employees/${id}`).then(response => {
      setEmployee({
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        email: response.data.data.email,
        kpi_id: kpi_id,
        rate: selectedValue
      })
      // console.log("kpilist", kpiList)
      // console.log(response.data.data.first_name)
      // console.log(response.data.data.valid_kpi);
      // console.log('valid kpi response', response.data.data)
    })
  }
  const fifi = async () => {
    await axios.post(`http://192.168.1.109:8000/api/employees/${id}`, employee).then(response => {
      // console.log(employee);
      // console.log(response);
    })
  }
  const handleChangeDropDown = (e) => {
    setSelectedValue(e);
    setEmployee({ ...employee, rate: e })
    // console.log(e);
  }

  useEffect(() => {
    finalFunction()
  }, [])

  return <View style={styles.item} >
    <Text style={styles.kpi}>
      {name}
    </Text>
    <Picker
      selectedValue={selectedValue}
      style={{ width: 100 }}
      // style ={styles.rate}
      onValueChange={handleChangeDropDown}
    >
      <Picker.Item label={rate + ''} value='0' />
      <Picker.Item label="1" value="1" />
      <Picker.Item label="2" value="2" />
      <Picker.Item label="3" value="3" />
      <Picker.Item label="4" value="4" />
      <Picker.Item label="5" value="5" />
      <Picker.Item label="6" value="6" />
      <Picker.Item label="7" value="7" />
      <Picker.Item label="8" value="8" />
      <Picker.Item label="9" value="9" />
      <Picker.Item label="10" value="10" />
    </Picker>
    <TouchableHighlight style={styles.btn}
      onPress={fifi}
    >
      <Text style={styles.btnText}>Add</Text>
    </TouchableHighlight>
  </View>
};


function KPI({ route }) {
  const { id } = route.params;
  const arr = [];
  const renderItem = ({ item }) => (
    <Item name={item.name} rate={item.latest_kpi.rate} kpi_id={item.latest_kpi.kpi_id} id={id} kpiList={kpiList} />
  );

  const [newkpi, setNewKpi] = useState({ name: '' });
  const [kpiList, setKpiList] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueRate, setSelectedValueRate] = useState("");
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    kpi_id: "",
    rate: "",
  });

  const handleChangeKpi = (e) => {
    setNewKpi({ name: e });
  }

  const getKpiEmployee = async () => {
    await axios.get(`http://192.168.1.109:8000/api/employees/validKPIS/${id}`).then(response => {
      setKpiList(response.data.data.valid_kpi)
      // console.log(response.data.data.valid_kpi);
      // console.log('valid kpi response', response.data.data)
    })
  }

  const handleSubmitKpi = async () => {
    await axios.post(`http://192.168.1.109:8000/api/kpi/`, newkpi).then(response => {
      // console.log(response.message);
      setNewKpi({ name: '' });
    })
  }


  const getKpi = async () => {
    const kpii = [];
    await axios.get(`http://192.168.1.109:8000/api/kpi`)
      .then(res => {
        res.data.data.map((a) => {
          // console.log(a.name)
          kpii.push(a.name);
        })
        console.log("kpisssssssssssssssss", kpis);
        setKpis(res.data.data);

      })
      .catch(err => console.log(err))
  }

  const handleChangeDropDown = (e) => {
    setSelectedValue(e);
    setEmployee({ ...employee, kpi_id: e })
    // console.log(e);
  }
  const handleChangeDropDownRate = (e) => {
    setSelectedValueRate(e);
    setEmployee({ ...employee, rate: e })
    // console.log(e);
  }
  const fifi = async () => {
    await axios.post(`http://192.168.1.109:8000/api/employees/${id}`, employee).then(response => {
      console.log(employee);
      console.log(response);
    })
  }
  const finalFunction = async () => {
    await axios.get(`http://192.168.1.109:8000/api/employees/${id}`).then(response => {
      setEmployee({
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        email: response.data.data.email,
        kpi_id: selectedValue,
        rate: selectedValueRate
      })
      // console.log("kpilist", kpiList)
      // console.log(response.data.data.first_name)
      // console.log(response.data.data.valid_kpi);
      // console.log('valid kpi response', response.data.data)
    })
  }

  useEffect(() => {
    getKpiEmployee();
    getKpi();
    finalFunction();
  }, []);

  return (
    <SafeAreaView>
      <Text>KPI empId: {JSON.stringify(id)}</Text>


      <View style={styles.item}>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeKpi}
          value={newkpi.name}
          placeholder="useless placeholder"
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
      <View style={styles.item2}>
        {kpiList.map((a) => {
          <Text style={styles.btn}>{a}</Text>
        })}

        <Picker
          selectedValue={selectedValue}
          onValueChange={handleChangeDropDown}
          style={{ width: 150, height: 10, justifyContent: 'center' }}
        >
          {kpis.map((a) => {
            return <Picker.Item label={a.name} value={a.id} />
          })}
        </Picker>
        <Picker
          selectedValue={selectedValueRate}
          style={{ width: 100 }}
          // style ={styles.rate}
          onValueChange={handleChangeDropDownRate}
        >
          {/* <Picker.Item label={rate + ''} value='0' /> */}
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
        <TouchableHighlight style={styles.btn}
          onPress={fifi}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableHighlight>
      </View>
      <FlatList
        data={kpiList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item2: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 5,
    marginHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    // margin: 12,
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
  btnText: {
    color: "#ededed",
  },
  kpi: {
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderColor:"#fff",
    borderWidth:2,
    overflow:'hidden',
    fontSize: 18,
    width: 90,
    textAlign: 'center',

  },
  rate: {
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 16,
    width: 50,
    textAlign: 'center',
  }
})

export default KPI