import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import InstructionsChild from '../components/InstructionsChild'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default function Instructions({ route, navigation }) {
  const {
    rate, prevRate, currBg, prevBg, d50w, action,
    id, firstName, lastName, room, dob
  } = route.params;

  return (
    <View style={styles.container}>
      <Header />
      <Main
        child={
          <InstructionsChild
            navigation={navigation}
            rate={rate}
            prevRate={prevRate}
            currBg={currBg}
            prevBg={prevBg}
            d50w={d50w}
            action={action}
            id={id}
            firstName={firstName}
            lastName={lastName}
            room={room}
            dob={dob}
          />}
      />
      <Footer />
    </View>
  );
}