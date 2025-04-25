import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

interface OnboardingItemProps {
    id: number;
    title: string;
    description: string;
    subdescription: string;
    image: any;
}

export default function OnboardingItem({ item }: { item: OnboardingItemProps }) {
    const { width, height } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={[styles.image, { width, resizeMode: 'cover' }]} />
                <View style={styles.fadeOverlay1} />
                <View style={styles.fadeOverlay2} />
                <View style={styles.fadeOverlay3} />
                <View style={styles.fadeOverlay4} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.subdescription}>{item.subdescription}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
    },
    imageContainer: {
        height: '60%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    fadeOverlay1: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 150,
        backgroundColor: 'black',
        opacity: 0.2,
    },
    fadeOverlay2: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
        backgroundColor: 'black',
        opacity: 0.4,
    },
    fadeOverlay3: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        backgroundColor: 'black',
        opacity: 0.6,
    },
    fadeOverlay4: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 25,
        backgroundColor: 'black',
        opacity: 0.8,
    },
    textContainer: {
        height: '40%',
        paddingHorizontal: 30,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28, // Taille augmentée
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    subdescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
    },
});
