import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton } from "../../components/ActionButton";
import { FloatingLabelInput, FloatingLabelSelect } from "../../components/floating-fields";
import { PaletteColors } from "../../constants/colors";
import { LayoutScale, screenHorizontalPadding } from "../../constants/layoutScales";
import { Typography } from "../../constants/typography";
import { AGE_OPTIONS, useProfileSetup } from "../../features/auth/hooks/useProfileSetup";
import { GENDER_OPTIONS, type Gender } from "../../features/auth/types";

export default function ProfileSetupScreen() {
  const {
    fullName,
    setFullName,
    gender,
    setGender,
    age,
    setAge,
    error,
    isSubmitting,
    submitTitle,
    handleSubmit,
  } = useProfileSetup();

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>These details help us set up your TasteHub owner profile.</Text>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Personal details</Text>
          <FloatingLabelInput
            autoCapitalize="words"
            autoComplete="name"
            label="Full name"
            onChangeText={setFullName}
            placeholder="Enter your full name"
            value={fullName}
          />
          <FloatingLabelSelect
            label="Gender"
            onChange={(value) => setGender(value as Gender)}
            options={GENDER_OPTIONS}
            value={gender}
          />
          <FloatingLabelSelect
            label="Age"
            onChange={setAge}
            options={AGE_OPTIONS}
            value={age}
          />
        </View>

        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

        <View style={styles.submitArea}>
          <ActionButton
            disabled={isSubmitting}
            onPress={() => void handleSubmit()}
            title={submitTitle}
            trailingLabel="→"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PaletteColors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: LayoutScale.lg_24,
    paddingBottom: LayoutScale.xl_32,
  },
  title: {
    ...Typography.subHeading,
    color: PaletteColors.app262626,
    fontWeight: "800",
  },
  subtitle: {
    ...Typography.subtitle,
    marginTop: LayoutScale.xs_4,
    marginBottom: LayoutScale.xl_32,
  },
  form: {
    gap: LayoutScale.xs_4,
  },
  sectionTitle: {
    ...Typography.title,
    marginBottom: LayoutScale.sm_8,
    color: PaletteColors.app404040,
    fontWeight: "700",
  },
  error: {
    marginBottom: LayoutScale.md_16,
    color: PaletteColors.red,
    fontSize: 12,
  },
  submitArea: {
    marginTop: "auto",
    paddingTop: LayoutScale.xl_32,
  },
});