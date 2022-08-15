import { User } from "./User";

export type Cat = {
    id: number;
    name: string;
    origin: string;
    lifeSpan: string;
    description: string;
    imgUrl: string;
    user: User;
};
