import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetCars } from '@/query/cars';
import CarListItem from '@/components/CarListItem';
import ProgressBar from '@/components/ProgressBar';
import CarDetailsView from '@/components/CarDetailsView';

const queryClient = new QueryClient();
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    left: {
        flex: 1.3,
        backgroundColor: '#1c2a48',
    },
    right: {
        flex: 1.7,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        zIndex: 1,
    },
    header: {
        paddingHorizontal: 20,
    },
    card: {
        width: width * 0.8,
        alignSelf: 'center',
        borderRadius: 16,
        overflow: 'hidden',
    },
    carImage: {
        marginTop: 40,
        width: '100%',
        height: 180,
    },
    price: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    trendingSection: {
        position: 'absolute',
        bottom: 60,
        marginTop: 30,
    },
    trendingTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    TextLuxeSmall: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F23557',
        marginTop: 30,
        marginLeft: 20,
        width: '100%',
    },
    TextLuxeBig: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#F23557',
        marginTop: 30,
        marginLeft: 20,
        width: '100%',
    },
});

function OurCarsContent() {
    const { data, isLoading } = useGetCars();
    const [centerIndex, setCenterIndex] = useState(0);
    const [selectedCar, setSelectedCar] = useState(null);
    const trendingRef = useRef(null);

    if (isLoading || !data) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/octaneLogo.png')}
                        style={{ width: 150, height: 150 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ color: '#1c2a48', fontSize: 16 }}>Chargement...</Text>
                </View>
            </View>
        );
    }

    const cars = data.cars ?? [];
    const ITEM_WIDTH = 120 + 10;

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        setCenterIndex(index);
    };

    const car = cars[centerIndex] || cars[0];

    const openDetails = (car: any) => {
        setSelectedCar(car);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* FOND BLEU/BLANC */}
            <View style={styles.background}>
                <View style={styles.left} />
                <View style={styles.right} />
            </View>

            {/* CONTENU */}
            <View style={[styles.container, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/octaneLogo.png')}
                        style={{ width: 150, height: 150 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Affichage de la voiture centrale */}
                <TouchableOpacity style={styles.card} onPress={() => openDetails(car)}>
                    <Animated.View key={car.id} entering={FadeInRight} exiting={FadeOutLeft}>
                        <Image
                            source={{ uri: `https://octaneserver.onrender.com/assets/${car.image}` }}
                            style={styles.carImage}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    <View>
                        <Text style={styles.price}>${car.specs?.dailyPrice ?? 2100} / jour</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    {car.name.length > 14 ? (
                        <Text style={styles.TextLuxeSmall}>{car.name}</Text>
                    ) : (
                        <Text style={styles.TextLuxeBig}>{car.name}</Text>
                    )}
                </View>

                <View style={styles.trendingSection}>
                    <Text style={styles.trendingTitle}>Nos voitures</Text>
                    <ProgressBar length={cars.length} activeIndex={centerIndex} />
                    <FlatList
                        ref={trendingRef}
                        data={cars}
                        horizontal
                        keyExtractor={(item) => `trend-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={ITEM_WIDTH}
                        decelerationRate="fast"
                        onMomentumScrollEnd={handleScroll}
                        renderItem={({ item, index }) => (
                            <CarListItem carItem={item} isCenter={index === centerIndex} />
                        )}
                        contentContainerStyle={{ paddingHorizontal: (width - 120) / 2 }}
                    />
                </View>
            </View>
            { selectedCar && (
                <CarDetailsView
                    car={selectedCar}
                    onClose={() => setSelectedCar(null)}
                />  
            )}
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