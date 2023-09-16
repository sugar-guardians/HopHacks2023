import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    flexDirection: 'row',
  },
  scrollArea: {
    // backgroundColor: 'yellow',
    flex: 1,
  }
});

export default function Main({ child }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        {child}
      </ScrollView>
    </SafeAreaView>
  );
}