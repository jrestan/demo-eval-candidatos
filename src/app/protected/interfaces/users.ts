export interface IUsers {
    total: number;
    pages: number;
    page:  number;
    limit: number;
    data:  UserData[];
    links: Link[];
}

export interface UserData {
    id:       number;
    username: string;
    profiles: string[];
    fullname: string;
    status:   string;
}

export interface Link {
    rel:  string;
    href: string;
    kind: string;
}

