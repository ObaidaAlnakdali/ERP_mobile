import * as React from 'react';
import { Text, View, SafeAreaView, StatusBar, Button, Image, StyleSheet, TextInput } from 'react-native';
import Employee from './components/Employee';
import Login from './components/Login';
import Constants from 'expo-constants';
import Loading from './components/Loading'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ERP</Text>
      </View>
      {/* <Login /> */}
      <Employee />
    </SafeAreaView>               
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ededed',
    marginTop: StatusBar.currentHeight || 0,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    margin:20,
  },
  button:{
    marginTop:30,
  },
  input: {
    width:200,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },  
  
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#8AB038',
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
