import { Manga } from './types.d';

export type Author = {
    id: number;
    lastname: string;
    firstname: string;
    description: string;
    createdAt: Date;
};

export type Cart = {
    id: number;
    createdAt: Date;
    status: string;
    paymentCart: PaymentCart;
    user: User;
};

export type Category = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
};


export type Categories = {
    content: Category[];
    size: number;
    totalElements: number;
    totalPages: number;
};

export type Comment = {
    id: number;
    rating: number;
    createdAt: Date;
    comment: string;
    user: User;
}

export type Comments = {
    content: Comment[];
    size: number;
    totalElements: number;
    totalPages: number;
}

export type Gender = {
    id: number;
    label: string;
};

export type Genre = {
    id: number;
    label: string;
    createdDate: Date;
    img: string;
};


export type Genres ={
    content: Genre[];
    size: number;
    totalElements: number;
    totalPages: number;
}


export type Manga = {
    id: number;
    title: string;
    releaseDate: Date;
    summary: string;
    createdAt: Date;
    price: number;
    pointFidelity: number;
    category: Category;
    authors: Author[];
    genres: Genre[];
    pictures: Picture[];
    users: User[];
};

export type Mangas ={
    content: Manga[];
    size: number;
    totalElements: number;
    totalPages: number;
}

export type OrdersStatus = {
    id: number;
    label: string;
};

export type PaymentCart = {
    id: number;
    label: string;
    createdAt: Date;
};

export type Picture = {
    id: number;
    img: string;
    isPoster: boolean;
    title: string;
}

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    fisrtname: string;
    lastname: string;
    createdAt: Date;
    img: string;
    address: Address;
    gender: Gender;
};

export type DataManga = {
    comments: Comments;
    manga: Manga;
    ratingAll: number[];
}

export type DataAuthor = {
    mangas: Mangas;
    author: Author;
}

export type DataGenre = {
    mangas: Mangas;
    genre: Genre;
}
export type DataUser = {
    user: User;
    mangasId: number[];

}

export type DataCategory = {
    mangas: Mangas;
    category: Category;

}


export type Address = {
    city : string;
    line1: string;
    line2: string;
    line3: string;
    postal_code: string;
}
