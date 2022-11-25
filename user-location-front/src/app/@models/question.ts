import { Post } from "./abstract/post";

export interface Question extends Post{
    title: string;
    location: string;
    is_liked: boolean;
}
