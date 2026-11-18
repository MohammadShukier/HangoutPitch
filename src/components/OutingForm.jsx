import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as z from "zod";
import { colors, sizes } from "../constants/colors";
import { outingStatuses, outingTypes } from "../constants/outingOptions";
import { outingSchema } from "../utils/validation";
import AppButton from "./AppButton";
import AppTextInput from "./AppTextInput";
import OutingFilters from "./OutingFilters";

// One form for both adding and editing. The screen gives the starting values and
// the button text, and gets the valid data back through onSubmit.
export default function OutingForm({ initialValues, submitText, onSubmit }) {
  const [title, setTitle] = useState(initialValues.title);
  const [type, setType] = useState(initialValues.type);
  const [location, setLocation] = useState(initialValues.location);
  // A TextInput works with text, so the cost is kept as a string while typing.
  const [estimatedCost, setEstimatedCost] = useState(String(initialValues.estimatedCost));
  const [date, setDate] = useState(initialValues.date);
  const [status, setStatus] = useState(initialValues.status);
  const [notes, setNotes] = useState(initialValues.notes);
  const [fieldErrors, setFieldErrors] = useState({});

  function handleSubmit() {
    const result = outingSchema.safeParse({ title, type, location, estimatedCost, date, status, notes });
    if (result.success === false) {
      // One message under each invalid field, and nothing is saved.
      setFieldErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setFieldErrors({});

    // result.data is the cleaned-up version: text trimmed, cost turned into a number.
    onSubmit(result.data);
  }

  const hasErrors = Object.keys(fieldErrors).length > 0;

  return (
    <View>
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <AppTextInput value={title} onChangeText={setTitle} placeholder="Sunset hike at ..." />
        {fieldErrors.title && <Text style={styles.error}>{fieldErrors.title[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Type</Text>
        <OutingFilters options={outingTypes} selected={type} onChange={setType} />
        {fieldErrors.type && <Text style={styles.error}>{fieldErrors.type[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <AppTextInput value={location} onChangeText={setLocation} placeholder="Where is it?" />
        {fieldErrors.location && <Text style={styles.error}>{fieldErrors.location[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <AppTextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {fieldErrors.date && <Text style={styles.error}>{fieldErrors.date[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Estimated cost (USD)</Text>
        <AppTextInput
          value={estimatedCost}
          onChangeText={setEstimatedCost}
          placeholder="0 = free"
          keyboardType="numeric"
        />
        {fieldErrors.estimatedCost && <Text style={styles.error}>{fieldErrors.estimatedCost[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>
        <OutingFilters options={outingStatuses} selected={status} onChange={setStatus} />
        {fieldErrors.status && <Text style={styles.error}>{fieldErrors.status[0]}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Notes (optional)</Text>
        <AppTextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Anything friends should know"
          multiline
          style={styles.notesInput}
        />
        {fieldErrors.notes && <Text style={styles.error}>{fieldErrors.notes[0]}</Text>}
      </View>

      {hasErrors && <Text style={styles.formError}>Please fix the errors above.</Text>}

      <AppButton text={submitText} onPress={handleSubmit} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: sizes.label,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
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
