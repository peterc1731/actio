import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../styles/styles';

interface Props {
  message: string;
}

function ErrorScreen({ message }: Props) {
  const { error } = useTheme();
  return (
    <View style={styles.centered}>
      <Text style={[styles.errorText, { color: error }]}>
        An error has occurred:
      </Text>
      <Text style={[styles.errorText, { color: error }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  errorText: {
    fontSize: 25,
    fontWeight: '400',
    marginBottom: 15,
  },
});

export default ErrorScreen;
