import { DataFastProvider } from "datafast/react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { configure } from "crisp-sdk-react-native";

export default function RootLayout() {
  useEffect(() => {
    const websiteId = process.env.EXPO_PUBLIC_CRISP_WEBSITE_ID;
    if (websiteId) configure(websiteId);
  }, []);

  const content = <Stack screenOptions={{ headerShown: false }} />;

  const websiteId = process.env.EXPO_PUBLIC_DATAFAST_WEBSITE_ID;
  const domain = process.env.EXPO_PUBLIC_DATAFAST_DOMAIN;

  if (!websiteId || !domain) return content;

  return (
    <DataFastProvider
      config={{
        websiteId,
        domain,
        debug: __DEV__,
      }}
    >
      {content}
    </DataFastProvider>
  );
}
