import { useState } from 'react';
import { View, FlatList } from 'react-native';

import { CATEGORIES } from '@/utils/data/products';
import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';

export default function Home() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  function handleCategorySelectedIndex({ index }: { index: number }) {
    setCategoryIndex(index);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" />
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <CategoryButton
            title={item}
            isSelected={index === categoryIndex}
            onPress={() => {
              handleCategorySelectedIndex({ index });
            }}
          />
        )}
      />
    </View>
  );
}
