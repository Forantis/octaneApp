import { Text, View } from "react-native";

import Onboarding from "@/components/Onboarding";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }} 
    >
      <Onboarding />
    </View>
  );
}
