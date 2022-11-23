import { Post } from "./abstract/post";

export interface Answer extends Post {
    questionId: string;
}
