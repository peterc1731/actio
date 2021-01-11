import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
}

function ErrorScreen({ message }: Props) {
  return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>An error has occurred:</Text>
      <Text style={styles.errorText}>{message}</Text>
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
    color: 'red',
    fontSize: 25,
    fontWeight: '400',
    marginBottom: 15,
  },
});

export default ErrorScreen;
