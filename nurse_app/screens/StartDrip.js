import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import SelectPatientChild from '../components/SelectPatientChild';


const patients = [
  { firstName: 'John', lastName: 'Smith', dob: '07/25/1963', room: '14B', id: '0184329234' },
  { firstName: 'Emily', lastName: 'Williams', dob: '11/09/1971', room: '2A', id: '203829489' },
  { firstName: 'Donald', lastName: 'Ezwick', dob: '02/17/1969', room: '5A', id: '923084302' },
]
const TestPage = () => {

  const TestChild = () => (
    <Text>Hello!</Text>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Main child={<SelectPatientChild patients={patients} />} />
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

export default TestPage;