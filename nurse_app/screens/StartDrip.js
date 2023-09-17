import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import SelectPatientChild from '../components/SelectPatientChild';
import { API_URI } from '../config';


const StartDrip = ({ navigation }) => {
  let [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`${API_URI}/get-all-patient-data/1`);
      return resp.json();
    };

    (async () => {
      try {
        const patients = await fetchData();
        setPatients(patients);
      } catch (e) {
        console.log(e);
      }
    })()
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Main child={<SelectPatientChild patients={patients} navigation={navigation} />} />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default StartDrip;