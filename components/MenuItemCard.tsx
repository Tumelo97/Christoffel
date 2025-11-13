// components/MenuItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../types';

interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      <Text style={styles.course}>{item.course}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 13, color: '#666', marginVertical: 2 },
  price: { fontSize: 15, fontWeight: '600', color: '#2e8b57' },
  course: { fontSize: 12, color: '#888' },
});
