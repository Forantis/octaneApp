import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import slides from '../onboarding_data';
import OnboardingItem from './OnboardingItem';
import PaginationDot from './PaginationDot';

export default function Onboarding() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0]?.index ?? 0);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <OnboardingItem item={item} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                scrollEventThrottle={32}
            />
            <View style={styles.paginationContainer}>
                <PaginationDot data={slides} scrollX={scrollX} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
    },
});