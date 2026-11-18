import * as z from "zod";
import { outingStatuses, outingTypes } from "../constants/outingOptions";

// Login form: checked before we compare with the mock account.
export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// True only for dates that exist on the calendar.
// new Date rolls "2026-02-30" over to March 2, so a fake date won't match what was typed.
function isRealDate(text) {
  const [year, month, day] = text.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Add/Edit outing form. Every value arrives as text from the inputs.
export const outingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(60, "Title can be at most 60 characters."),
  type: z.enum(outingTypes, "Choose a type."),
  location: z
    .string()
    .trim()
    .min(1, "Location is required.")
    .max(80, "Location can be at most 80 characters."),
  // coerce turns the typed text into a number ("15" → 15). An empty box counts as 0 = free.
  estimatedCost: z.coerce
    .number("Cost must be a number.")
    .min(0, "Cost can't be negative.")
    .max(10000, "Cost can be at most 10000."),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD.")
    .refine(isRealDate, "This date doesn't exist."),
  status: z.enum(outingStatuses, "Choose a status."),
  notes: z.string().trim().max(300, "Notes can be at most 300 characters."),
});
