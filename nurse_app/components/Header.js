import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    color: '#5116FB',
  }
});

export default function Header() {
  let [fontsLoaded, fontError] = useFonts({ Raleway_700Bold });

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDateAndTime = () => {
      setCurrentDate(new Date());
    }

    const intervalId = setInterval(updateDateAndTime, 30000); // Updates every minute

    return () => clearInterval(intervalId); // Clear the interval on component unmount
}, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{format(currentDate, 'cccc, LLLL d, yyyy')}</Text>
      <Text style={styles.text}>{format(currentDate, 'HH:mm')}</Text>
    </View>
  );
}