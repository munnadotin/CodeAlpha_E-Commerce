export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    images: string[];
    createdAt: string;
    updatedAt: string;
}
