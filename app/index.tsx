import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import Onboarding from "@/components/Onboarding";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà complété l'onboarding
    const checkOnboardingStatus = async () => {
      try {
        const status = await SecureStore.getItemAsync('onboardingCompleted');
        
        if (status === 'true') {
          // Si l'onboarding est complété, rediriger vers home
          router.replace('/home');
        } else {
          // Sinon, afficher l'onboarding
          setOnboardingCompleted(false);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Onboarding />
    </View>
  );
}
