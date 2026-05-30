export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    images: string[];
    createdby: {
        name: string;
        email: string;
    };
    ratings: number;
    createdAt: string;
    updatedAt: string;
    quantity?: number;
}

export interface FormData {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    discount: number;
    images: FileList | string[];
}
