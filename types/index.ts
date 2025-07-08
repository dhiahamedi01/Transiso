// types/index.ts
export type ImageKey = 'image1' | 'image2' | 'image3' | 'image4' | 'image5';

export interface ProduitDB {
  id: number;
  name: string;
  category: string;
  old_price: string | null;
  price: string;
  stock: string;
  description: string | null;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
  image5?: string | null;
}
