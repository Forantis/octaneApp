import { Text, View } from 'react-native';
import { useGetCars } from '@/query/cars';
import { FlatList, Image, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client outside the component
const queryClient = new QueryClient();

const styles = StyleSheet.create({
    carContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 8,
    },
    carImage: {
        width: 100,
        height: 60,
        borderRadius: 8,
    },
    carDetails: {
        marginLeft: 10,
        flex: 1,
    },
    carName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    carSpecs: {
        marginTop: 5,
    },
    carSpec: {
        color: '#888',
        fontSize: 14,
    },
});

function OurCarsContent() {
    const { data, isLoading } = useGetCars();

    if (isLoading || !data) {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 24 }}>Nos Voitures</Text>
                <Text style={{ color: '#888', fontSize: 16 }}>Explorez notre sélection de voitures</Text>
                <Text style={{ color: 'white', marginTop: 20 }}>Chargement...</Text>
            </View>
        );
    }

    const cars = data.cars || [];

    return (
        <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
            <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 30 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>Nos Voitures</Text>
                <Text style={{ color: '#888', fontSize: 16 }}>Explorez notre sélection de voitures</Text>
            </View>

            <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Liste des voitures :</Text>

            <FlatList
                data={cars}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.carContainer}>
                        <Image 
                            source={{ uri: `https://octaneserver.onrender.com/assets/${item.image}` }} 
                            style={styles.carImage} 
                            resizeMode="cover"
                        />
                        <View style={styles.carDetails}>
                            <Text style={styles.carName}>{item.name}</Text>
                            <View style={styles.carSpecs}>
                                <Text style={styles.carSpec}>Puissance: {item.specs?.power || "N/A"} ch</Text>
                                <Text style={styles.carSpec}>Vitesse max: {item.specs?.topSpeed || "N/A"} km/h</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
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