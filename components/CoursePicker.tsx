// components/CoursePicker.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Course } from '../types';

interface Props {
  selected: Course;
  onValueChange: (value: Course) => void;
}

const courses: Course[] = ['Starters', 'Mains', 'Desserts'];

export default function CoursePicker({ selected, onValueChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Course:</Text>
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => onValueChange(itemValue as Course)}
        style={styles.picker}
      >
        {courses.map(c => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  picker: { backgroundColor: '#f0f0f0' },
});