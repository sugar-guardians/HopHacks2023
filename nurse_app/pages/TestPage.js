import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';


const TestPage = () => {
  // Define a function to handle the button click event
  const handleButtonClick = () => {
    // Add your logic here for what should happen when the button is clicked
    alert('Button clicked!');
  };

  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const TestChild = () => (
    <Text>Hello!</Text>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Main child={<TestChild />} />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
});

export default TestPage;