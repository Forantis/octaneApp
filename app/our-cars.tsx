import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Text, View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useGetCars } from '@/query/cars';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        backgroundColor: '#1c2a48',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    subText: {
        color: '#ccc',
        fontSize: 16,
        marginTop: 4,
    },
    carousselContainer: {
        marginTop: -30,
    },
    card: {
        width: width * 0.8,
        backgroundColor: '#fff',
        alignSelf: 'center',
        paddingTop: 15,
        marginTop: 20,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    carImage: {
        width: '100%',
        height: 180,
    },
    carDetails: {
        padding: 15,
    },
    carName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c2a48',
    },
    carSpec: {
        color: '#666',
        fontSize: 14,
        marginTop: 4,
    },
    price: {
        color: '#1c2a48',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    trendingSection: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    trendingTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1c2a48',
        marginBottom: 15,
    },
    trendingItem: {
        width: 120,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 15,
        marginRight: 10,
        overflow: 'hidden',
    },
    trendingItemCenter: {
        width: 120,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 15,
        marginRight: 10,
        overflow: 'hidden',
        transform: [{ translateY: -15 }],
    },
    trendingImage: {
        width: '100%',
        height: '100%',
    },
});

function OurCarsContent() {
    const { data, isLoading } = useGetCars();
    const [centerIndex, setCenterIndex] = useState(0);
    const trendingRef = useRef(null);

    // Valeur animée pour l'item central
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            friction: 6,
        }).start(() => {
            animatedValue.setValue(0); // reset pour la prochaine animation
        });
    }, [centerIndex]);

    if (isLoading || !data) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Nos Voitures</Text>
                    <Text style={styles.subText}>Explorez notre sélection de voitures</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ color: '#1c2a48', fontSize: 16 }}>Chargement...</Text>
                </View>
            </View>
        );
    }

    const cars = data.cars || [];

    const ITEM_WIDTH = 120 + 10;

    const handleScroll = (event : any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        setCenterIndex(index);
    };

    const car = cars[centerIndex] || cars[0];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Nos Voitures</Text>
                <Text style={styles.subText}>Explorez notre sélection de voitures</Text>
            </View>

           {/* Affichage de la voiture centrale */}
            <View style={styles.card}>
                <Image
                    source={{ uri: `https://octaneserver.onrender.com/assets/${car.image}` }}
                    style={styles.carImage}
                    resizeMode="cover"
                />
                <View style={styles.carDetails}>
                    <Text style={styles.carName}>{car.name}</Text>
                    <Text style={styles.carSpec}>Puissance: {car.specs?.power || "N/A"} ch</Text>
                    <Text style={styles.carSpec}>Vitesse max: {car.specs?.topSpeed || "N/A"} km/h</Text>
                    <Text style={styles.price}>${car.pricePerDay || 2100} / jour</Text>
                </View>
            </View>

            <View style={styles.trendingSection}>
                <Text style={styles.trendingTitle}>Touts nos voitures</Text>
                <FlatList
                    ref={trendingRef}
                    data={cars}
                    horizontal
                    keyExtractor={(item) => `trend-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ITEM_WIDTH}
                    decelerationRate="fast"
                    onMomentumScrollEnd={handleScroll}
                    renderItem={({ item, index }) => {
                        const isCenter = index === centerIndex;

                        return (
                            <Animated.View
                                style={[
                                    isCenter ? styles.trendingItemCenter : styles.trendingItem,
                                ]}
                            >
                                <Image
                                    source={{ uri: `https://octaneserver.onrender.com/assets/${item.image}` }}
                                    style={styles.trendingImage}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        );
                    }}
                    contentContainerStyle={{ paddingHorizontal: (width - 120) / 2 }}
                />
            </View>
        </View>
    );
}

export default function OurCars() {
    return (
        <QueryClientProvider client={queryClient}>
            <OurCarsContent />
        </QueryClientProvider>
    );
}