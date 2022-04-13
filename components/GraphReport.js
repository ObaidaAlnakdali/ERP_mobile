import React from 'react'
import { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Dimensions, screenWidth } from 'react-native';
import {LineChart, BarChart} from "react-native-chart-kit";
import axios from 'axios';



function GraphReport({ route }) {
  const [dataReport, setDataReport] = useState([])
  const  { id }  = route.params;

  const getData = (async () => {
    let res = await axios.get(`http://192.168.0.115:8000/api/employees/groupKpi/${id}`)
    try {
      setDataReport(res.data.data.group_kpi)
    } catch (err) {
      console.log(err)
    }
  });

  const data ={
    labels: [],
    datasets: [{ data: [] }],
  };

  const Item = ({ name, Data }) => {
    Data.map(item => {
      data.labels.unshift(item.created_at.substring(0, 7))
      data.datasets[0].data.unshift(item.rate)
    })
    data.labels.unshift(0)
    data.datasets[0].data.unshift(0)
    return (
      <View style={styleSheet.chart}>
        <Text style={styleSheet.chartText}>{name}</Text>
        <BarChart
          data={data}
          width={Dimensions.get('window').width - 60}
          height={230}
          yAxisLabel={'$ - '}
          chartConfig={{
            backgroundColor: '#c6cb48c2',
            backgroundGradientFrom: '#a5aa37c2',
            backgroundGradientTo: '#458336',
            decimalPlaces: 2,
            color: (opacity = 255) => '#ECEFF1',
            style: {
              borderRadius: 12, padding: 10
            },
          }}
        />
      </View>
  )};

  const renderItem = ({ item }) => (
    
    <Item name={item?.name} Data={item?.kpi} />
  );
  
  useEffect( () => {
   getData()
  }, []);
  
  return (
    <View style={styleSheet.MainContainer}>

       <FlatList
          style={styleSheet.body}
          data={dataReport}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        
  </View>
  )
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    paddingHorizontal:20,
    width: '100%',
    paddingBottom:50
  },
  chart:{
    margin:15,
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  chartText:{
    textAlign:'center',
    padding:10,
  }
});

export default GraphReport