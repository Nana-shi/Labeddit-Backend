import { CommentDB, CommentWithCreatorDB, LikeDislikeDB, PostByUserDB, PostDB, PostWithCommentsDB } from "../types";

export class Post {
    constructor(
        private id: string,
        private content: string,
        private comments: number,
        private likes: number,
        private dislikes: number,
        private created_at: string,
        private updated_at: string,
        private creator: {
            id: string,
            name: string
        },
        private comments_post: CommentWithCreatorDB
    ) { }
    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creator.id,
            comments: this.comments,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
    public toCommentDBModel():CommentDB{
        return{
            id: this.id,
            creator_id: this.creator.id,
            post_id: this.comments_post.post_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
    public toLikeDislikeDBModel():LikeDislikeDB{
        return{
            post_id: this.id,
            user_id: this.creator.id,
            like: this.likes
        }
    }
    public toBusinessModel():PostByUserDB{
        return{
            id: this.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            creator: this.creator
        }
    }
    public toBusinessCommentsModel():PostWithCommentsDB{
        return{
            id: this.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            comments_post: this.comments_post,
            creator: this.creator
        }
    }
    public getId():string{
        return this.id
    }
    public setId(value:string):void{
        this.id = value
    }
    public getContent():string{
        return this.content
    }
    public setContent(value:string):void{
        this.content = value
    }
    public getComments():number{
        return this.comments
    }
    public setComments(value:number):void{
        this.comments = value
    }
    public getLikes():number{
        return this.likes
    }
    public setLikes(value:number):void{
        this.likes = value
    }
    public getDislikes():number{
        return this.dislikes
    }
    public setDislikes(value:number):void{
        this.dislikes = value
    }
    public getCreatedAt():string{
        return this.created_at
    }
    public setCreatedAt(value:string):void{
        this.created_at = value
    }
    public getUpdatedAt():string{
        return this.updated_at
    }
    public setUpdatedAt(value:string):void{
        this.updated_at = value
    }
    public getCreator():{id:string, name:string}{
        return this.creator
    }
    public setCreator(value:{id:string, name: string}):void{
        this.creator = value
    }   
}