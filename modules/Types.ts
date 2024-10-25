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
    locationMain?: string;
}

interface AuthorData {
    uuid: string;
    avatar: string;
    score: number;
}

export interface AdCardData {
    id: number;
    images: string[];
    locationMain: string;
    locationStreet: string;
    author: AuthorData;
}
