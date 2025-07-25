import {Types} from "mongoose";

export type SizeLabel = 'sm' | 'md' | 'lg';

export interface Size {
    _id: string
    label: SizeLabel;
    price: number;
}

export interface Category {
    _id: string;
    title: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    _id: string;
    name: string;
    image: string;
    basePrice: number;
    description: string;
    sizes: Size[];
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
}

export type ProductData = {
    products: Product[];
    totalProducts: number;
    totalFilteredProducts: number;
}

// Cart
export interface CartItem {
    product: Types.ObjectId | string;
    size: string;
    quantity: number;
}

