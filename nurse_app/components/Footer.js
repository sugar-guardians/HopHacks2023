import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flex: 0.15,
  },
  info: {
    flex: 0.6,
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  avatarWrapper: {
    flex: 0.4,
    backgroundColor: 'red',
    paddingRight: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  avatarInnerWrapper: {
    backgroundColor: 'pink',
    height: 75,
    width: 75,
    alignSelf: 'center',
    borderRadius: '50%',
    position: 'relative',
  },
  image: {
    height: 75,
    width: 75,
    objectFit: 'fill',
    position: 'absolute',
  }
});

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.text}>Binh Nguyen</Text>
        <Text style={styles.text}>Unit: 3A</Text>
        <Text style={styles.text}>Registered Nurse</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarInnerWrapper}>
          <Image
            style={styles.image}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/40px-User-avatar.svg.png?20201213175635' }}
          />
        </View>
      </View>
    </View>
  );
}