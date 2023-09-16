import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  }
});

export default function Header() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDateAndTime = () => {
      setCurrentDate(new Date());
    }

    const intervalId = setInterval(updateDateAndTime, 30000); // Updates every minute

    return () => clearInterval(intervalId); // Clear the interval on component unmount
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{format(currentDate, 'cccc, LLLL d, yyyy')}</Text>
      <Text style={styles.text}>{format(currentDate, 'HH:mm')}</Text>
    </View>
  );
}