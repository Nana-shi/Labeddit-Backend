import { UserDatabase } from "../database/UserDatabase"
import { GetAllUsersInputDTO, LoginDTO, SignUpDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { TokenPayload, USER_ROLES } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public async getAllUsers(input:GetAllUsersInputDTO){
        const {q, token} = input
        if(typeof token !== "string"){
            throw new BadRequestError("'token' não informado!")
        }
        const payload = this.tokenManager.getPayload(token)
        if(payload === null){
            throw new BadRequestError("'token' inválido!")
        }
        if(payload.role !== USER_ROLES.ADMIN){
            throw new BadRequestError('Você não é um admin para usar esse recurso!')
        }
        const usersDB = await this.userDatabase.getAllUsers()
        const users = usersDB.map((userDB)=>{
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )
            return user.toDBModel()
        })
        return users
    }
    public async signUp(input:SignUpDTO){
        const {name, email, password} = input
        const id = this.idGenerator.generate()
        const passwordHash = await this.hashManager.hash(password)
        const created_at = (new Date()).toISOString()
        const filterUserByEmail = await this.userDatabase.getUserByEmail(email)
        if(filterUserByEmail){
            throw new BadRequestError("'e-mail' já cadastrado em outra conta.")
        }
        if(typeof name !== "string"){
            throw new BadRequestError("'name' precisa ser uma string")
        }
        if(typeof email !== "string"){
            throw new BadRequestError("'e-mail' precisa ser uma string")
        }
        if(typeof password !== "string"){
            throw new BadRequestError("'password' precisa ser uma string")
        }
        const newUser = new User(
            id,
            name,
            email,
            passwordHash,
            USER_ROLES.NORMAL,
            created_at
        )
        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }
        const token = this.tokenManager.createToken(tokenPayload)
        const newUserDB = newUser.toDBModel()
        await this.userDatabase.signUp(newUserDB)
        const output={
            message: "Usuário cadastro com sucesso",
            token
        }
        return output
    }
    public async login(input:LoginDTO){
        const {email, password} = input
        if(typeof email !== "string"){
            throw new BadRequestError("'e-mail' precisa ser uma string.")
        }
        if(password === undefined){
            throw new BadRequestError("Informe o 'password'")
        }
        const searchUserByLogin = await this.userDatabase.getUserByEmail(email)
        if(!searchUserByLogin){
            throw new NotFoundError("'E-mail' não cadastrado!")
        }
        const passwordHash = await this.hashManager.compare(password, searchUserByLogin.password)
        if(!passwordHash){
            throw new BadRequestError("'e-mail' ou 'senha' inválidos")
        }
        if(searchUserByLogin){
            const userLogin = new User(
                searchUserByLogin.id,
                searchUserByLogin.name,
                searchUserByLogin.email,
                searchUserByLogin.password,
                searchUserByLogin.role,
                searchUserByLogin.created_at
            )
            const tokenPayload: TokenPayload = {
                id: userLogin.getId(),
                name: userLogin.getName(),
                role: userLogin.getRole()
            }
            const token =  this.tokenManager.createToken(tokenPayload)
            const output = {
                message: "Login realizado com sucesso",
                token
            }
            return output
        } else{
            const output = {
                message: "Dados incorretos!",
                token: ''
            }
            return output
        }
    }
}