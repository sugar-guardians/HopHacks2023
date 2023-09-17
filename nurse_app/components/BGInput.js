import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { API_URI } from '../config';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  input: {
    height: 60,
    width: 150,
    backgroundColor: '#CDC8C8',
    borderRadius: 10,
    fontSize: 32,
  },
  text: {
    fontSize: 28,
  },
  textWrapper: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5116FB',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function BGInput({
  id, navigation, firstName, lastName, room, dob,
}) {
  const [bg, setBg] = useState("");

  const submitBg = async () => {
    try {
      const resp = await fetch('http://localhost:8000/titration-rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patient_id: Number(id),
          blood_glucose_measurement: Number(bg),
        })
      });
      const {
        titration_rate: rate, prev_titration_rate: prevRate,
        current_BG: currBg, prev_BG: prevBg, D50W_dosage: d50w, action
      } = await resp.json();
      navigation.navigate("Instructions", {
        rate, prevRate, currBg, prevBg, d50w, action,
        id, firstName, lastName, room, dob
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <TextInput
          onChangeText={setBg}
          value={bg}
          keyboardType="numeric"
          style={styles.input}
          textAlign="center"
          placeholder="BG"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitBg}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}