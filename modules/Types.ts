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

// interface AuthorData {
//     uuid: string;
//     avatar: string;
//     score: number;
// }

// Interface of a response from DB
export interface AdvertData {
    id: string;
    images: string[];
    city: string;
    address: string;
    description: string;
    publicationDate: string;
    roomsNumber: string;

    // author: AuthorData;
    authorAvatar: string;
    authorName: string;
    authorRating: string;
    authorUUID: string;
}

export interface EditParams {
    username: string
    name: string
    email: string
    sex: number
    address: string
    birthdate: Date
    isHost: boolean
    password: string
    avatar: File | null
}