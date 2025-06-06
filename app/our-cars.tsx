import CarPriceAnimated from '@/components/CarPriceAnimated';
import CarNameAnimated from '@/components/CarNameAnimated';
import CarListItem from '@/components/CarListItem';
import ProgressBar from '@/components/ProgressBar';
import CarModel from '@/interfaces/carInterface';
import { useGetCars } from '@/query/cars';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft, FadeInLeft, FadeOutRight } from 'react-native-reanimated';
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
    headerText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
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
});

function OurCarsContent() {
    const { data, isLoading } = useGetCars();
    const [centerIndex, setCenterIndex] = useState(0);
    const [oldIndex, setOldIndex] = useState(0);
    const trendingRef = useRef(null);

    if (isLoading || !data) {
        return (
            
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/images/octaneLogo.png')}
                        style={{ width: 200, height: 200, marginTop: 50 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ color: '#ffffff', fontSize: 16 }}>Chargement...</Text>
                </View>
            </View>
        );
    }

    const cars : CarModel[] = data.cars ?? [];
    const ITEM_WIDTH = 120 + 10;

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        if (index === centerIndex || index < 0 || index >= cars.length) {
            return;
        }    
        setOldIndex(centerIndex);
        setCenterIndex(index);
    };

    const car = cars[centerIndex] || cars[0];

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
                <View style={styles.card}>
                    <Animated.View key={car.id} entering={centerIndex >= oldIndex ? FadeInRight : FadeInLeft} exiting={centerIndex >= oldIndex ? FadeOutLeft : FadeOutRight}>
                    <Image
                        source={{ uri: `https://octaneserver.onrender.com/assets/${car.image}` }}
                        style={styles.carImage}
                        resizeMode="cover"
                    />
                    </Animated.View>
                    <CarPriceAnimated price={car.specs?.dailyPrice ?? 2100} stylePrice={styles.price} />
                </View>

                <CarNameAnimated name={car.name} />

                <View style={styles.trendingSection}>
                    <Text style={styles.trendingTitle}>Nos voitures</Text>
                    <ProgressBar length={cars.length} activeIndex={centerIndex} 
                    />
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