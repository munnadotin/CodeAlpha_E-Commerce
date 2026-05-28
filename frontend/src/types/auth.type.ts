export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    address: Address[]
}

export interface Address {
    _id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}