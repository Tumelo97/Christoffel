// screens/GuestMenuScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MenuItemCard from '../components/MenuItemCard';
import { useMenu } from '../context/MenuContext';
import { getItemsByCourse } from '../utils/calculations';
import { Course, MenuItem } from '../types';

const filterOptions: (Course | 'All')[] = ['All', 'Starters', 'Mains', 'Desserts'];

export default function GuestMenuScreen() {
  const { menuItems } = useMenu();
  const [filter, setFilter] = useState<Course | 'All'>('All');
  const [cart, setCart] = useState<MenuItem[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const filteredItems = getItemsByCourse(menuItems, filter);

  const addToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const total = totalAmount.toFixed(2);

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items before ordering.');
      return;
    }

    const orderSummary = cart
      .map((item, i) => `${i + 1}. ${item.name} - R${item.price.toFixed(2)}`)
      .join('\n');

    Alert.alert(
      'Order Placed!',
      `Your order has been sent to the kitchen!\n\n${orderSummary}\n\nTOTAL: R${total}`,
      [{ text: 'OK', onPress: () => setCart([]) }]
    );
  };

  const getCourseCount = (course: Course): number =>
    menuItems.filter(i => i.course === course).length;

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Filter */}
      <View style={styles.filter}>
        <Picker
          selectedValue={filter}
          onValueChange={val => setFilter(val as Course | 'All')}
          style={styles.picker}
        >
          {filterOptions.map(opt => {
            const label =
              opt === 'All'
                ? 'All Courses'
                : `${opt} (${getCourseCount(opt as Course)})`;

            return <Picker.Item key={opt} label={label} value={opt} />;
          })}
        </Picker>
      </View>

      {/* Scroll Down Button - MOVED INSIDE return() */}
      <TouchableOpacity style={styles.scrollBtn} onPress={scrollToBottom}>
        <Text style={styles.scrollBtnText}></Text>
      </TouchableOpacity>

      {/* Menu Items */}
      <FlatList
        ref={flatListRef}
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <MenuItemCard item={item} />
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addBtnText}>Plus</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => {
          if (filter === 'All') return null;
          return (
            <Text style={styles.sectionTitle}>
              {filter} ({filteredItems.length})
            </Text>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No items in this course.</Text>
        )}
      />

      {/* CART & ORDER BUTTON */}
      {cart.length > 0 && (
        <View style={styles.cartContainer}>
          <View style={styles.cart}>
            <Text style={styles.cartTitle}>CART ({cart.length} items)</Text>
            {cart.map((item, i) => (
              <Text key={i} style={styles.cartItem}>
                • {item.name.padEnd(25)} R{item.price.toFixed(2)}
              </Text>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>TOTAL: R{total}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
            <Text style={styles.orderBtnText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// STYLES MUST BE AFTER return()
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  filter: { backgroundColor: 'white', margin: 16, borderRadius: 8 },
  picker: { height: 50 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    color: '#333',
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
  },
  addBtn: {
    backgroundColor: '#2e8b57',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  addBtnText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  cartContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cart: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  cartItem: { fontSize: 14, color: '#444', marginVertical: 2 },
  totalRow: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#ddd' },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#2e8b57', textAlign: 'right' },
  orderBtn: {
    backgroundColor: '#d4a017',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Scroll Down Button
  scrollBtn: {
    position: 'absolute',
    top: 80,
    right: 16,
    backgroundColor: '#2e8b57',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollBtnText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});