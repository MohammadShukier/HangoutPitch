import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, sizes } from "../constants/colors";
import { responseOptions } from "../constants/outingOptions";

// Three RSVP buttons. The current answer (value) is highlighted,
// and the screen decides what a tap does through onChange.
export default function ResponseSelector({ value, onChange }) {
  return (
    <View style={styles.row}>
      {responseOptions.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.button, isSelected && styles.buttonSelected]}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizes.radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  buttonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontSize: sizes.body,
    color: colors.text,
  },
  textSelected: {
    color: colors.white,
    fontWeight: "bold",
  },
});
