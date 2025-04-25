import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)', 'black']}
                    style={styles.gradient}
                    locations={[0, 0.3, 0.5, 0.7, 0.85, 1]}
                />
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
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 300, // Hauteur du dégradé augmentée pour une transition plus douce
    },
    textContainer: {
        height: '35%',
        paddingHorizontal: 30,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 27, // Taille augmentée
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
