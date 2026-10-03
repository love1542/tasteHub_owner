export type AuthFlow = "login" | "signup" | "forgot";
export type AuthMethod = "email" | "phone";
export const GENDER_OPTIONS = ["Female", "Male", "Non-binary", "Prefer not to say"] as const;
export type Gender = (typeof GENDER_OPTIONS)[number];