import { Text, View, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();
  const queryClient = new QueryClient();

  const handleEnterClick = () => {
  router.replace('/our-cars');
  }

  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Bienvenue chez Octane</Text>
      <Text style={styles.subtitle}>Votre expérience automobile commence maintenant</Text>
      <Button
        title={"Explorez nos voitures"}
        onPress={() => handleEnterClick()}
      />
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});