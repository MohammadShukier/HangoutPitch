import { StyleSheet, Text, View } from "react-native";
import { colors, statusColors } from "../constants/colors";

// Small colored pill: each status has its own color from colors.js.
export default function StatusBadge({ status }) {
  return (
    <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "bold",
  },
});
