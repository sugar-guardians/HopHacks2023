import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ route, navigation }) {
  const [currentDate, setCurrentDate] = useState('');
  const { nurseName, nurseID } = route.params;

  useEffect(() => {
    const updateDateAndTime = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
    
        setCurrentDate(
          year + '/' + month + '/' + date 
          + ' ' + hours + ':' + (min < 10 ? '0' + min : min)
        );
    }
    
    updateDateAndTime();
    const intervalId = setInterval(updateDateAndTime, 30000); // Updates every minute

    return () => clearInterval(intervalId); // Clear the interval on component unmount
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.dateTime}>{currentDate}</Text>
      <Text style={styles.welcomeText}>Welcome! {nurseName}, you currently don't have a patient. Please click below to start one.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Start')}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Name: {nurseName}</Text>
        <Text style={styles.footerText}>ID: {nurseID}</Text>
        <Text style={styles.footerText}>Role: Nurse</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',  // This is your background color
  },
  dateTime: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00aaff',  // Choose a color for your button
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',  // This is your button text color
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  footerText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default HomeScreen;
