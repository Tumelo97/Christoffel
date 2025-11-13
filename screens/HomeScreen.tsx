// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../context/MenuContext';
import { getAveragePriceByCourse } from '../utils/calculations';

const courses: ('Starters' | 'Mains' | 'Desserts')[] = ['Starters', 'Mains', 'Desserts'];

export default function HomeScreen() {
  const { menuItems } = useMenu();
  const navigation = useNavigation<any>();

  const totalItems = menuItems.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>

      <View style={styles.summary}>
        <Text style={styles.total}>Total Items: {totalItems}</Text>

        <Text style={styles.avgTitle}>Average Price by Course:</Text>
        {courses.map(course => {
          const avg = getAveragePriceByCourse(menuItems, course);
          return avg > 0 ? (
            <Text key={course} style={styles.avg}>
              • {course}: R{avg.toFixed(2)}
            </Text>
          ) : null;
        })}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ManageMenu')}
        >
          <Text style={styles.btnText}>Manage Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4682b4' }]}
          onPress={() => navigation.navigate('GuestView')}
        >
          <Text style={styles.btnText}>Guest View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ADD THIS ENTIRE BLOCK (was missing!)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  summary: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  avgTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  avg: {
    fontSize: 16,
    color: '#444',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: '#2e8b57',
    padding: 16,
    borderRadius: 10,
    flex: 0.45,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});