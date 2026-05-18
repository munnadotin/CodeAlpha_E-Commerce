export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }[];
    _id: string;
}
