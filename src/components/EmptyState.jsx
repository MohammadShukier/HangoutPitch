import { StyleSheet, Text, View } from "react-native";
import { colors, sizes } from "../constants/colors";
import AppButton from "./AppButton";

export default function EmptyState({ title, message, actionText, onAction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionText && <AppButton text={actionText} onPress={onAction} style={styles.button} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  message: {
    fontSize: sizes.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    minWidth: 180,
  },
});
