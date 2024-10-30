export interface RegisterParams {
    name: string;
    username: string;
    password: string;
    email: string;
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface AdsFilters {
    city?: string;
}

interface AuthorData {
    uuid: string;
    avatar: string;
    score: number;
}

export interface AdCardData {
    id: number;
    images: string[];
    city: string;
    address: string;
    author: AuthorData;
}
