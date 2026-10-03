import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import type { Gender } from "../types";
import { ageSchema, fullNameSchema, genderSchema } from "../validation";

export const AGE_OPTIONS = Array.from({ length: 120 }, (_, index) => String(index + 1));

export function useProfileSetup() {
  const { signIn } = useAuth();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError("");

    const nameValidation = fullNameSchema.safeParse(fullName);
    if (!nameValidation.success) {
      setError(nameValidation.error.issues[0]?.message ?? "Enter your full name.");
      return;
    }

    const genderValidation = genderSchema.safeParse(gender);
    if (!genderValidation.success) {
      setError(genderValidation.error.issues[0]?.message ?? "Select your gender.");
      return;
    }

    const ageValidation = ageSchema.safeParse(age);
    if (!ageValidation.success) {
      setError(ageValidation.error.issues[0]?.message ?? "Select your age.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn();
      router.replace("/");
    } catch {
      setError("Unable to save your profile right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fullName,
    setFullName,
    gender,
    setGender,
    age,
    setAge,
    error,
    isSubmitting,
    submitTitle: isSubmitting ? "Please wait..." : "Finish profile",
    handleSubmit,
  };
}