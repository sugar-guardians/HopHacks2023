import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  }
});

export default function BGInput({ id }) {
  const [bg, setBg] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Text>BG: </Text>
        <TextInput onChangeText={setBg} value={bg} inputMode="numeric" />
      </View>
      <Button title="Submit" />
    </SafeAreaView>
  );
}