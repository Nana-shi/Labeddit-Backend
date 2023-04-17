export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}
export interface UserDB{
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}
export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}
export interface CommentDB{
    id: string,
    creator_id: string,
    post_id: string
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}
export interface CommentWithCreatorDB{
    id: string,
    post_id: string
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator:{
        creator_id: string,
        name: string
    }
}
export interface PostByUserDB{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator:{
        id: string,
        name: string
    }
}
export interface PostWithCommentsDB{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    comments_post: CommentWithCreatorDB,
    creator:{
        id: string,
        name: string
    }
}
export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number
}
export interface LikeDislikeCommentDB{
    user_id: string,
    comment_id: string,
    like: number
}
export interface TokenPayload{
    id: string,
    name: string,
    role: USER_ROLES
}
