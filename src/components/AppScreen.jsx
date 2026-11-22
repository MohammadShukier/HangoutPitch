import { ScrollView, StyleSheet, View } from "react-native";
import { colors, sizes } from "../constants/colors";

export default function AppScreen({ children, centered }) {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, centered && styles.centered]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: sizes.padding,
  },
  centered: {
    justifyContent: "center",
  },
});
