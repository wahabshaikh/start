import { ArrowRight02Icon, CustomerSupportIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useDataFastScreen, useDataFastTrack } from "datafast/react-native";
import { show } from "crisp-sdk-react-native";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  useDataFastScreen("Home");
  const track = useDataFastTrack();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.kicker}>Cloudflare + Expo</Text>
        <Text style={styles.title}>Ship web and iOS products from one starter.</Text>
        <Text style={styles.body}>
          Better Auth, Hugeicons, DataFast and Crisp are already wired in.
        </Text>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            testID="start-building"
            style={styles.primary}
            onPress={() => track("starter_mobile_cta_click")}
          >
            <Text style={styles.primaryText}>Start building</Text>
            <HugeiconsIcon icon={ArrowRight02Icon} size={20} color="#fff" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={styles.secondary}
            onPress={() => process.env.EXPO_PUBLIC_CRISP_WEBSITE_ID && show()}
          >
            <HugeiconsIcon icon={CustomerSupportIcon} size={20} color="#111" />
            <Text style={styles.secondaryText}>Support</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 20 },
  kicker: { fontSize: 14, color: "#666", fontWeight: "600" },
  title: { fontSize: 48, lineHeight: 52, letterSpacing: -1.5, fontWeight: "700", color: "#111" },
  body: { fontSize: 18, lineHeight: 26, color: "#666", maxWidth: 620 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
  primary: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#111", borderRadius: 12, paddingHorizontal: 18, paddingVertical: 14 },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondary: { flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 18, paddingVertical: 14 },
  secondaryText: { color: "#111", fontSize: 16, fontWeight: "600" }
});
