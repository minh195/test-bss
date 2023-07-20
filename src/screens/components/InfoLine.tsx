import {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';

interface InfoLineProps {
  label: string;
  value?: string;
}

export const InfoLine: FC<InfoLineProps> = memo(({label, value}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>
        {label || ''}: <Text style={styles.value}>{value || ''}</Text>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: '400',
  },
});
