import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as z from "zod";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import { colors, sizes } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../utils/validation";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  function handleLogin() {
    setLoginError("");

    const result = loginSchema.safeParse({ email: email.trim(), password });
    if (result.success === false) {
      // fieldErrors = { email: [...], password: [...] } → one message under each field.
      setFieldErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setFieldErrors({});

    // Input is valid, now check it against the mock account.
    const isLoggedIn = login(result.data.email, result.data.password);
    if (!isLoggedIn) {
      setLoginError("Email or password is incorrect.");
      return;
    }

    // dismissAll removes Welcome + Login from the stack, then replace swaps in the tabs,
    // so the back button on Home leaves the app instead of going back to Welcome.
    if (router.canDismiss()) router.dismissAll();
    router.replace("/(tabs)");
  }

  return (
    <AppScreen centered>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to see your group&apos;s outings.</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <AppTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />
        {fieldErrors.email && <Text style={styles.error}>{fieldErrors.email[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <AppTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
        />
        {fieldErrors.password && <Text style={styles.error}>{fieldErrors.password[0]}</Text>}
      </View>

      {loginError !== "" && <Text style={styles.formError}>{loginError}</Text>}

      <AppButton text="Log in" onPress={handleLogin} style={styles.button} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: sizes.heading,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: sizes.body,
    color: colors.muted,
    marginTop: 4,
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: sizes.label,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  formError: {
    color: colors.error,
    fontSize: sizes.body,
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});
