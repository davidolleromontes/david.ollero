import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

import { images } from '../assets/images';
import Container from '../components/container';
import Navigation, { routeNames } from '../utils/navigation';

const App = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animation, {
        delay: 500,
        duration: 3000,
        toValue: 1,
      }),
    ]).start(() => {
      setTimeout(
        () => {
          Navigation.navigate(routeNames.Employees);
        },
      );
    });
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Container style={styles.container}>
      <Animated.View style={{ opacity }}>
        <Image style={styles.image} source={images.rebellion} />
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 3,
  },
});

export default App;