import { StyleSheet, Text, View } from "react-native";
import { LayoutScale } from "../constants/layoutScales";
import { Typography } from "../constants/typography";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <View>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    ...Typography.eyebrow,
  },
  title: {
    ...Typography.subHeading,
    marginTop: LayoutScale.ms_12,
  },
  subtitle: {
    ...Typography.subtitle,
    marginTop: LayoutScale.xsm_6,
  },
});