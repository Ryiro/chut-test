export interface ProductImage {
  id: string;
  url: string;
  isMain: boolean;
  productId: string;
}

export interface EditableProduct {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  image: string | null;
  images: ProductImage[];
  tags: {
    tag: {
      id: string;
      name: string;
    }
  }[];
  specs: Record<string, any>;
}