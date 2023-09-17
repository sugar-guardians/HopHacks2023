import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const styles = StyleSheet.create({
  container: {
    flex: 0.12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#323134',
    width: '100%',
    paddingBottom: 15,
  },
  text: {
    fontSize: 32,
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
  }
});

export default function Header() {
  let [fontsLoaded, fontError] = useFonts({ Montserrat_700Bold });

//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const updateDateAndTime = () => {
//       setCurrentDate(new Date());
//     }

//     const intervalId = setInterval(updateDateAndTime, 30000); // Updates every minute

//     return () => clearInterval(intervalId); // Clear the interval on component unmount
// }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SugarGuardians</Text>
    </View>
  );
}