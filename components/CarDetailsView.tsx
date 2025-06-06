import CarModel from '@/interfaces/carInterface';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the arrow icon

interface CarDetailsViewProps {
  car: CarModel;
  onClose: () => void;
}

const CarDetailsView: React.FC<CarDetailsViewProps> = ({ car, onClose }) => {
  const slideAnim = React.useRef(new Animated.Value(500)).current; // Start off-screen to the right
  const roundedMotorSize = car.specs?.motorSize ? (car.specs.motorSize / 1000).toFixed(1) : '0.0';
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the center
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button pressed');
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal transparent={true} visible={true} onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="chevron-back-outline" size={24} color="#354167" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            {isFavorite ? (<Ionicons name="heart" size={24} color="#354167" />) :
            <Ionicons name="heart-outline" size={24} color="#354167" />
            }
          </TouchableOpacity>

          <Image
            source={{
              uri: `https://octaneserver.onrender.com/assets/${car.image}`,
            }}
            style={styles.carImage}
          />
          <Text style={styles.status}>Available</Text>
          <View style={styles.detailsPageBottom}>
            <Text style={styles.title}>{car.name}</Text>
            <Text style={styles.description}>
              The Mercedes-Benz SLR McLaren (C199 / R199 / Z199) is a grand
              tourer jointly developed by German automotive manufacturer
              Mercedes-Benz and British automobile manufacturer McLaren
              Automotive and sold from 2003 to 2009.
            </Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>{car.specs?.power} hp</Text>
                <Text style={styles.detailSubtitle}>
                  {roundedMotorSize} L ({car.specs?.motorSize} cc)
                </Text>
              </View>
              <View style={styles.detailsSeparator} />
              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>{car.specs?.wheelDrive}</Text>
                <Text style={styles.detailSubtitle}>Dual Motor</Text>
              </View>
            </View>
            <Text style={styles.specs}>
              <Text style={{ fontWeight: "bold" }}>Acceleration:</Text> 0 - 100
              mph in {car.specs?.acceleration} sec{"\n"}
              <Text style={{ fontWeight: "bold" }}>Top speed:</Text> up to{" "}
              {car.specs?.topSpeed} kmh
            </Text>
            <View style={styles.footer}>
              <Text style={styles.price}>
                $2100 <Text style={styles.priceSubtitle}>/ day</Text>
              </Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 100,
    marginHorizontal: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    alignSelf: 'flex-start',
    zIndex: 1,
    padding: 24,
  },
    favoriteButton: {
        position: 'absolute',
        top: 52,
        right: 10,
        zIndex: 2,
        padding: 24,
    },
  closeText: {
    fontSize: 16,
    color: 'red',
  },
  carImage: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    paddingTop: 80,
    height: 434,
    resizeMode: 'contain',
    backgroundColor: '#F3F3F3',
  },
    detailsPageBottom: {
        position: 'absolute',
        paddingLeft: 30,
        paddingRight: 30,
        top: 390,
        width: '100%',
        margin: 0,
        backgroundColor: 'white',
        zIndex: 1,
    },
  status: {
    backgroundColor: '#F23557',
    fontWeight: 'bold',
    position: 'absolute',
    top: 120,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 18,
    color: '#354167',
  },
  description: {
    fontFamily: 'Futura',
    color: '#354167',
    opacity: 0.5,
    fontSize: 14,
    marginBottom: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(215, 216, 222, 0.1)',
    paddingHorizontal: 39,   
  },
  detailsSeparator: {
    width: 1,
    height: 66,
    backgroundColor: 'rgba(53, 65, 103, 0.1)',
    marginHorizontal: 10,
  },
  detailItem: {
    alignItems: 'center',
    gap: 13,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#354167',
    opacity: 1,
    fontFamily: 'Futura',
  },
  detailSubtitle: {
    fontSize: 12,
    color: '#354167',
    opacity: 0.5,
    fontFamily: 'Futura',
  },
  specs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 'auto',
    fontSize: 15,
    color: 'rgba(53, 65, 103, 0.5)',
    fontFamily: 'Futura',
    marginBottom: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#354167',
    fontFamily: 'Futura',
    letterSpacing: -0.5,
  },
  priceSubtitle: {
    fontSize: 14,
    color: 'rgba(53, 65, 103, 0.5)',
    opacity: 0.5,
    fontFamily: 'Futura',
    letterSpacing: -0.5,
  },
  bookButton: {
    backgroundColor: '#354167',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 73,
    width: '54%',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CarDetailsView;