import { z } from "zod";
import { GENDER_OPTIONS } from "./types";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .email("Enter a valid email address.");

export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1, "Enter your phone number.")
  .max(20, "Enter a valid phone number.")
  .regex(/^\+?[\d\s().-]+$/, "Enter a valid phone number.")
  .refine((value) => value.replace(/\D/g, "").length >= 7, "Enter a valid phone number.");

export const fullNameSchema = z.string().trim().min(1, "Enter your full name.");

export const genderSchema = z.enum(GENDER_OPTIONS, {
  errorMap: () => ({ message: "Select your gender." }),
});

export const ageSchema = z
  .string()
  .regex(/^\d{1,3}$/, "Select your age.")
  .refine((value) => Number(value) >= 1 && Number(value) <= 120, "Select an age between 1 and 120.");

export const otpCodeSchema = z.string().regex(/^\d{6}$/, "Enter the complete 6-digit code.");

export const passwordSchema = z.string().min(1, "Enter your password to continue.");

export const passwordResetSchema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters for your new password."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match.",
  });