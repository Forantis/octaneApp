import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('../assets/images/onboarding1.jpg'), // You'll need to add these images
    title: "Besoin d’évasion ?\nPrends le volant, le reste attendra.",
    description: 'Chez Octane, chaque trajet est une opportunité.',
  },
  {
    id: 2,
    image: require('../assets/images/onboarding2.jpg'),
    title: '4 roues. 600 chevaux. Zéro compromis.',
    description: 'Loue des voitures puissantes, luxueuses, inaccessibles ailleurs.\nOctane, c’est l’exclusivité à portée de main',
  },
  {
    id: 3,
    image: require('../assets/images/onboarding3.jpg'),
    title: 'Loue en 30 secondes',
    description: 'Pas de paperasse, pas d’attente.\nRéserve. Conduis. Profite.',
  },
  {
    id: 4,
    component: 'login',
  },
];

export default function Onboarding() {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item }: { item: any }) => {
    if (item.component === 'login') {
      return (
        <View style={styles.slide}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Welcome</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.loginButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <ImageBackground source={item.image} style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});