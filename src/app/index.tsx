import { useRef, useState } from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';

import { CATEGORIES, MENU } from '@/utils/data/products';
import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { Product } from '@/components/product';
import { Link } from 'expo-router';
import { useCartStore } from '@/stores/cart-store';

export default function Home() {
  const cartStore = useCartStore();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const sectionListRef = useRef<SectionList>(null);

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleCategorySelectedIndex({ index }: { index: number }) {
    setCategoryIndex(index);

    if (sectionListRef.current !== null) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: index,
        itemIndex: 0
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantity={cartQuantityItems} />
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

      <SectionList
        sections={MENU}
        ref={sectionListRef}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
      />
    </View>
  );
}
