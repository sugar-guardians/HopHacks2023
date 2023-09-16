import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  }
});

export default function BGInput({ id }) {
  const [bg, setBg] = useState("0");

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Text>BG: </Text>
        <TextInput onChangeText={setBg} value={bg} keyboardType="numeric" />
      </View>
      <Button title="Submit" />
    </SafeAreaView>
  );
}