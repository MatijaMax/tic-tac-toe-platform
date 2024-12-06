export interface User {
    id: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    points: number;
    streak: number;
    inQueue: boolean;
}