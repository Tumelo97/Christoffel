// screens/ManageMenuScreen.tsx
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import AddDishForm from '../components/AddDishForm';
import MenuItemCard from '../components/MenuItemCard';
import { useMenu } from '../context/MenuContext';

export default function ManageMenuScreen() {
  const { menuItems, addItem, removeItem } = useMenu();

  // AUTO-ADD 12 DISHES ON FIRST LOAD
  React.useEffect(() => {
    if (menuItems.length === 0) {
      const starterDishes = [
        { name: 'Bobotie Spring Rolls', description: 'Crispy pastry filled with spiced mince & apricot chutney', course: 'Starters', price: 68.00 },
        { name: 'Peri-Peri Chicken Livers', description: 'Flame-grilled in spicy peri-peri sauce, served with toast', course: 'Starters', price: 72.00 },
        { name: 'Snoek Pâté', description: 'Creamy smoked snoek spread with melba toast', course: 'Starters', price: 65.00 },
        { name: 'Biltong & Cheese Board', description: 'Selection of dry wors, biltong & gouda', course: 'Starters', price: 95.00 },
      ];

      const mainDishes = [
        { name: 'Oxtail Potjie', description: 'Slow-cooked in red wine with baby onions & carrots', course: 'Mains', price: 185.00 },
        { name: 'Cape Malay Chicken Curry', description: 'Fragrant curry with turmeric, cinnamon & coconut milk', course: 'Mains', price: 145.00 },
        { name: 'Boerewors & Pap', description: 'Grilled boerewors with maize meal & chakalaka', course: 'Mains', price: 125.00 },
        { name: 'Grilled Kingklip', description: 'Fresh linefish with lemon butter & veg', course: 'Mains', price: 195.00 },
        { name: 'Lamb Bunny Chow', description: 'Durban-style curry in a bread loaf', course: 'Mains', price: 155.00 },
      ];

      const dessertDishes = [
        { name: 'Malva Pudding', description: 'Sticky apricot sponge with custard', course: 'Desserts', price: 68.00 },
        { name: 'Koeksisters', description: 'Twisted doughnuts soaked in syrup', course: 'Desserts', price: 55.00 },
        { name: 'Milk Tart', description: 'Cinnamon-dusted custard in pastry', course: 'Desserts', price: 62.00 },
      ];

      const allDishes = [...starterDishes, ...mainDishes, ...dessertDishes];

      allDishes.forEach(dish => {
        addItem({
          id: Date.now().toString() + Math.random(),
          ...dish,
        });
      });
    }
  }, [menuItems.length, addItem]);

  return (
    <View style={styles.container}>
      <AddDishForm onAdd={addItem} />

      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            showRemove
            onRemove={() => removeItem(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items yet. Add one!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  empty: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16 },
});