import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import AppTextInput from "./AppTextInput";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={colors.muted} style={styles.icon} />
      <AppTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search outings by title"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  input: {
    paddingLeft: 40,
  },
});
