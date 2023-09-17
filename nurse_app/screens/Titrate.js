import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ActionOptionsChild from '../components/ActionOptionsChild'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default function Titrate({ navigation, route }) {
  const { id, firstName, lastName, bday, room } = route.params;
  return (
    <View style={styles.container}>
      <Header />
      <Main
        child={
          <ActionOptionsChild
            id={id}
            firstName={firstName}
            lastName={lastName}
            bday={bday}
            room={room}
            navigation={navigation}
          />
        }
      />
      <Footer />
    </View>
  );
}