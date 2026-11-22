import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, sizes } from "../constants/colors";
import { typeIcons } from "../constants/outingOptions";
import StatusBadge from "./StatusBadge";

export default function OutingCard({ outing, onOpen }) {
  const goingCount = outing.responses.filter((r) => r.response === "going").length;

  return (
    <Pressable
      onPress={() => onOpen(outing)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.titleRow}>
        <Ionicons name={typeIcons[outing.type]} size={22} color={colors.primary} />
        <Text style={styles.title}>{outing.title}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={16} color={colors.muted} />
        <Text style={styles.info}>{outing.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={16} color={colors.muted} />
        <Text style={styles.info}>{outing.location}</Text>
      </View>

      <View style={styles.footer}>
        <StatusBadge status={outing.status} />
        <Text style={styles.going}>{goingCount} going</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  info: {
    flex: 1,
    fontSize: 15,
    color: colors.muted,
    marginLeft: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  going: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.success,
  },
});
