import { type ProductProps } from '@/utils/data/products';
import { type ProductCartProps } from '../cart-store';

export function add(
  products: ProductCartProps[],
  newProduct: ProductProps
): ProductCartProps[] {
  const existingProduct = products.find(
    (product) => newProduct.id === product.id
  );

  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: ++product.quantity }
        : product
    );
  }

  return [...products, { ...newProduct, quantity: 1 }];
}
