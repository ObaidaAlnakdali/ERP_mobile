import React from 'react'
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

function Main({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>ERP Codi</Text>
         <TouchableHighlight
          style={styles.btn}
          onPress={() => navigation.navigate("AddKpi")}
        >
          <Text style={styles.btnText}>KPI</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => navigation.navigate("Employees")}
        >
          <Text style={styles.btnText}>Employee</Text>
        </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        marginVertical: 20,
        alignItems: "center",
        flex: 1,
    },
    btn:{
        margin:40,
        padding:30,
        backgroundColor:'#8AB038',
        width:250,
        textAlign:'center',
        borderRadius:25,
    },
    btnText:{
        color:'white',
        textAlign:'center',
        fontSize:20
    },
    title:{
        fontSize:40,
        color:'#39451f',
        marginVertical:60
    }
    
  });

export default Main