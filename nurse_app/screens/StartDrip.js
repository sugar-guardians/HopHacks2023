import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import SelectPatientChild from '../components/SelectPatientChild';
import { API_URI } from '../config';


// const patients = [
//   { firstName: 'John', lastName: 'Smith', dob: '07/25/1963', room: '14B', id: '0184329234' },
//   { firstName: 'Emily', lastName: 'Williams', dob: '11/09/1971', room: '2A', id: '203829489' },
//   { firstName: 'Donald', lastName: 'Ezwick', dob: '02/17/1969', room: '5A', id: '923084302' },
// ]
const StartDrip = ({ navigation }) => {
  let [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`${API_URI}/get-all-patient-data/1`);
      console.log(API_URI);
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