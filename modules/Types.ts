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
    location?: 1 | 3 | 5 | 10 | string;
    rating?: number;
    new?: boolean;
    gender?: 'male' | 'female';
    guests?: 5 | 10 | 20 | 50;
}

// Interface of a response from DB
export interface AdvertData {
    id: string;
    images: {
        id: number;
        path: string;
    }[];
    city: string;
    address: string;
    description: string;
    publicationDate: string;
    roomsNumber: number;

    author: { avatar: string; name: string; rating: number };
    authorUUID: string;
}

export interface EditParams {
    username: string;
    name: string;
    email: string;
    sex: string | null;
    birthdate: Date;
    isHost: boolean;
    avatar: File | null;
}

export interface City {
    description: string;
    enTitle: string;
    id: number;
    title: string;
}

export interface ProfileInfo {
    avatar: string;
    birthDate: string;
    email: string;
    guestCount: number;
    id: string;
    isHost: boolean;
    name: string;
    password: string;
    score: number;
    sex: string;
    username: string;
}

export interface ReviewData {
    hostId: string;
    title: string;
    text: string;
    rating: number;
    createdAt: string;
    userAvatar: string;
    userName: string;
}

export interface GraphicPoint {
    date: string;
    rating: number;
}
