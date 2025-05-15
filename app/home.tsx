import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  const router = useRouter();

  const handleEnterClick = () => {
  router.replace('/our-cars');
  }

  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../assets/images/octaneLogo.png')} style={styles.image} />
      <Text style={styles.title}>Bienvenue chez Octane</Text>
      <Text style={styles.subtitle}>L'expérience automobile de vos rêves.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEnterClick()} >
          <Text style={styles.buttonText}>Explorez nos voitures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleEnterClick()} >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleEnterClick()} >
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354167",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 50,
    borderRadius: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    fontWeight: "semibold",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 80,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#EE3557",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 16,
  },
});