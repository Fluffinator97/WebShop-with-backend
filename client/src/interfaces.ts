export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    kategori: string;
    season: string[];
    inventory: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
    }
    description: string;
  }
export interface CollectionItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    kategori: string;
    season: string[];
    inventory: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
    }
    description: string;
  }
  
 // behåll till kategorier
  export interface Collection {
    id: number;
    title: string;
    routeName: string;
    items: CollectionItem[];
  }