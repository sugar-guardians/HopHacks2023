import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

function IntroVideoScreen({ navigation }) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (status.didJustFinish) {
     navigation.navigate('Home', { nurseName: 'John Doe', nurseID: '12345' });
    }
  }, [status, navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../intro.mp4')} // Replace with the path to your video file
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        style={styles.video}
        useNativeControls
        onPlaybackStatusUpdate={setStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default IntroVideoScreen;
