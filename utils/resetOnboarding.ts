import * as SecureStore from 'expo-secure-store';

export const resetOnboarding = async (): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync('onboardingCompleted');
    console.log('Onboarding status reset successfully');
    return true;
  } catch (error) {
    console.error('Error resetting onboarding status:', error);
    return false;
  }
};