import React from 'react'
import { useState, useEffect } from 'react';
import { SafeAreaView, TouchableHighlight, View, TextInput, Image, FlatList, StyleSheet, Text, StatusBar, Button, Pressable } from 'react-native';
import axios from 'axios';

function KPI({ route }) {
  const  { id }  = route.params;
  
  return (
    <View><Text>KPI empId: {JSON.stringify(id)}</Text></View>
  )
}

export default KPI