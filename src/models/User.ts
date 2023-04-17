import { UserDB, USER_ROLES } from "../types";

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private created_at: string
    ){}
    public toDBModel():UserDB{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.created_at
        }
    }
    public getId():string{
        return this.id
    }
    public setId(value:string):void{
        this.id = value
    }
    public getName():string{
        return this.name
    }
    public setName(value:string):void{
        this.name = value
    }
    public getPassword():string{
        return this.password
    }
    public setPassword(value:string):void{
        this.password = value
    }
    public getRole():USER_ROLES{
        return this.role
    }
    public setRole(value:USER_ROLES):void{
        this.role = value
    }
    public getCreatedAt():string{
        return this.created_at
    }
    public setCreatedAt(value:string):void{
        this.created_at = value
    }
}