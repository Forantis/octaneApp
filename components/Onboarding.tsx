import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import slides from '../onboarding_data';

import OnboardingItem from './OnboardingItem';

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <OnboardingItem item={item} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    slide: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
});