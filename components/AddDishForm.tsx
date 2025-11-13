// components/AddDishForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CoursePicker from './CoursePicker';
import { Course, MenuItem } from '../types';

interface Props {
  onAdd: (item: MenuItem) => void;
}

export default function AddDishForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starters');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Enter a valid price');
      return;
    }

    onAdd({
      id: Date.now().toString(),
      name,
      description,
      course,
      price: priceNum,
    });

    setName('');
    setDescription('');
    setPrice('');
    setCourse('Starters');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 60 }]}
        multiline
      />
      <CoursePicker selected={course} onValueChange={setCourse} />
      <TextInput
        placeholder="Price (e.g. 85.00)"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="ADD DISH" onPress={handleAdd} color="#2e8b57" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8, margin: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});