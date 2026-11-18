import { StyleSheet, TextInput } from "react-native";
import { colors, sizes } from "../constants/colors";

// A styled TextInput: every prop (value, onChangeText, placeholder, ...) is passed straight through.
export default function AppTextInput({ style, ...props }) {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholderTextColor={colors.muted}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.radius,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: sizes.body,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
