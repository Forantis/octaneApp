import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

interface OnboardingItemProps {
    id: number;
    title: string;
    description: string;
    subdescription: string;
    image: any;
    isLastSlide?: boolean;
}

export default function OnboardingItem({ item }: Readonly<{ item: OnboardingItemProps }>) {
    const { width } = useWindowDimensions();
    const router = useRouter();

    const handleGetStarted = async () => {
        // Enregistrer que l'onboarding a été complété
        await storeOnboardingStatus();
        
        // Naviguer vers l'écran principal de l'application
        router.push('/home');
    };

    const storeOnboardingStatus = async () => {
        try {
            await SecureStore.setItemAsync('onboardingCompleted', 'true');
            console.log('Onboarding status stored successfully');
        } catch (error) {
            console.error('Error storing onboarding status:', error);
        }
    };

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
                
                {item.isLastSlide && (
                    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}>Commencer l'expérience</Text>
                    </TouchableOpacity>
                )}
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
        height: 300,
    },
    textContainer: {
        height: '35%', // Un peu moins pour laisser de la place aux dots
        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 50, // Ajout de padding en bas pour les dots
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30, // Légèrement plus grand comme demandé
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
        marginBottom: 25,
    },
    button: {
        backgroundColor: '#FF4D00', // Couleur orange pour Octane (vous pouvez ajuster)
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
