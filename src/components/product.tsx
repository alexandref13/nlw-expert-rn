/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  Image,
  type ImageProps,
  View,
  Text
} from 'react-native';

interface ProductDataProps {
  title: string;
  description: string;
  thumbnail: ImageProps;
}

type ProductProps = {
  data: ProductDataProps;
} & TouchableOpacityProps;

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-full flex-row items-center pb-4"
        {...rest}
      >
        <Image source={data.thumbnail} className="h-20 w-20 rounded-md" />

        <View className="flex-1 ml-3">
          <Text className="text-slate-100 font-subtitle text-base flex-1">
            {data.title}
          </Text>
          <Text className="text-slate-400 text-xs leading-5 mt-0.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);