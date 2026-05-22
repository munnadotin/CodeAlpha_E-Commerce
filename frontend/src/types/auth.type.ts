export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    address: address[]
}

export interface address {
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