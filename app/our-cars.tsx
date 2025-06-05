import React, { useRef, useState, useEffect } from 'react';
import { Animated, Text, View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useGetCars } from '@/query/cars';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        /* backgroundColor: '#fff', */
    },
    right: {
        flex: 1.7,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        zIndex: 1,
    },
   /*  container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    }, */
    header: {
        /* backgroundColor: '#1c2a48', */
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
        /* backgroundColor: '#fff', */
        alignSelf: 'center',
        marginTop: 10,
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
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    trendingSection: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    trendingTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    trendingItem: {
        width: 120,
        height: 80,
        /* borderRadius: 8, */
        backgroundColor: '#F3F3F3',
        marginTop: 25,
        marginRight: 10,
        overflow: 'hidden',
    },
    TextLux: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#F23557',
        marginTop: 30,
        marginLeft: 20,
        width: '100%',
    },
    trendingImage: {
        width: '100%',
        height: '100%',
    },
});

function TrendingItem({ item, isCenter }: { item: any, isCenter: boolean }) {
    const animatedValue = useRef(new Animated.Value(isCenter ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: isCenter ? 1 : 0,
            useNativeDriver: true,
            friction: 6,
        }).start();
    }, [isCenter]);

    const animatedStyle = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                }),
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                }),
            },
        ],
    };

    return (
        <Animated.View style={[styles.trendingItem, animatedStyle]}>
            <Image
                source={{ uri: `https://octaneserver.onrender.com/assets/${item.image}` }}
                style={styles.trendingImage}
                resizeMode="cover"
            />
        </Animated.View>
    );
}

function ProgressBar({ length, activeIndex }: { length: number, activeIndex: number }) {
    const progress = (activeIndex + 1) / length;

    return (
        <View style={{ width: 100, alignSelf: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, justifyContent: 'flex-end' }}>
                <Text style={{ color: '#1c2a48', fontWeight: 'bold', fontSize: 14 }}>
                    {activeIndex + 1} / {length}
                </Text>
            </View>
            <View style={{
                height: 8,
                backgroundColor: '#eee',
                borderRadius: 4,
                overflow: 'hidden',
            }}>
                <Animated.View
                    style={{
                        height: 8,
                        backgroundColor: '#1c2a48',
                        width: `${progress * 100}%`,
                        borderRadius: 4,
                    }}
                />
            </View>
        </View>
    );
}

function OurCarsContent() {
    const { data, isLoading } = useGetCars();
    const [centerIndex, setCenterIndex] = useState(0);
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

    const cars = data.cars || [];
    const ITEM_WIDTH = 120 + 10;

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
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
                    <Image
                        source={{ uri: `https://octaneserver.onrender.com/assets/${car.image}` }}
                        style={styles.carImage}
                        resizeMode="cover"
                    />
                    <View style={styles.carDetails}>
                        <Text style={styles.price}>${car.specs?.dailyPrice || 2100} / jour</Text>
                    </View>
                </View>

                <View style={styles.carousselContainer}>
                    <Text style={styles.TextLux}>VOITURE</Text>
                </View>

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
                            <TrendingItem item={item} isCenter={index === centerIndex} />
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