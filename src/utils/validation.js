import * as z from "zod";

// Login form: checked before we compare with the mock account.
export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
