import { Category } from './category';

export interface Product {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    sold: number;
    price: number;

    imageCover: string;
    images: string[];

    ratingsAverage: number;
    ratingsQuantity: number;

    category: Category;

    subcategory: SubCategoryInProduct[];

    brand: BrandInProduct;

    createdAt: string;
    updatedAt: string;
}

export interface SubCategoryInProduct {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface BrandInProduct {
    _id: string;
    name: string;
    slug: string;
    image: string;
}
