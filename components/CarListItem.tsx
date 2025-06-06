import CarModel from "@/interfaces/carInterface";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const styles = StyleSheet.create({
    carListItem: {
        width: 120,
        height: 80,
        backgroundColor: '#F3F3F3',
        marginTop: 25,
        marginRight: 10,
        overflow: 'hidden',
    },
    carListItemImage: {
        width: '100%',
        height: '100%',
    },
});

export default function CarListItem({ carItem, isCenter }: { carItem: CarModel, isCenter: boolean }) {
    const animatedValue = useSharedValue(isCenter ? 1 : 0);

    useEffect(() => {
        animatedValue.value = withSpring(isCenter ? 1 : 0);
    }, [isCenter]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(animatedValue.value, [0, 1],[1, 1.05])
            },
            {
                translateY: interpolate(animatedValue.value, [0, 1],[0, -15])
            },
        ],
    }));

    return (
        <Animated.View style={[styles.carListItem, animatedStyle]}>
            <Image
                source={{ uri: `https://octaneserver.onrender.com/assets/${carItem.image}` }}
                style={styles.carListItemImage}
                resizeMode="cover"
            />
        </Animated.View>
    );
}