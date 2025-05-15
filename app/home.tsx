import { Text, View, StyleSheet, Button } from "react-native";
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
      <View style={styles.blueSection} />
      <View style={styles.whiteSection} />
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue chez Octane</Text>
        <Text style={styles.subtitle}>Votre expérience automobile commence maintenant</Text>
      </View>
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  blueSection: {
    flex: 1.5,
    backgroundColor: "#354167",
  },
  whiteSection: {
    flex: 2,
    backgroundColor: "white",
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});