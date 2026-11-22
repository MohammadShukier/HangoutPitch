import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import OutingForm from "../../components/OutingForm";
import { colors, sizes } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import { useOutings } from "../../context/OutingsContext";

const emptyOuting = {
  title: "",
  type: "",
  location: "",
  estimatedCost: "",
  date: "",
  status: "Idea",
  notes: "",
};

export default function OutingFormScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { outings, isLoaded, addOuting, updateOuting } = useOutings();

  const isEditMode = id !== undefined;
  const outing = outings.find((o) => o.id === Number(id));
  const screenTitle = isEditMode ? "Edit outing" : "New outing";

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  }

  function handleAdd(values) {
    addOuting({ ...values, createdBy: user.name, responses: [{ name: user.name, response: "going" }] });
    Alert.alert("Outing added", `"${values.title}" was added.`, [{ text: "OK", onPress: goBack }]);
  }

  function handleEdit(values) {
    updateOuting(outing.id, values);
    goBack();
  }

  if (!user) return <Redirect href="/login" />;

  if (!isLoaded) {
    return (
      <AppScreen centered>
        <Stack.Screen options={{ title: screenTitle }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </AppScreen>
    );
  }

  if (isEditMode && !outing) {
    return (
      <AppScreen centered>
        <Stack.Screen options={{ title: screenTitle }} />
        <Text style={styles.notFoundTitle}>Outing not found</Text>
        <Text style={styles.notFoundText}>It may have been deleted.</Text>
        <AppButton text="Back" onPress={goBack} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Stack.Screen options={{ title: screenTitle }} />
      <OutingForm
        initialValues={isEditMode ? outing : emptyOuting}
        submitText={isEditMode ? "Save changes" : "Add outing"}
        onSubmit={isEditMode ? handleEdit : handleAdd}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  notFoundTitle: {
    fontSize: sizes.heading,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  notFoundText: {
    fontSize: sizes.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
});
