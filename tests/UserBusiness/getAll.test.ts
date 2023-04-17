import { UserBusiness } from "../../src/business/UserBusiness"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    test("Deve retornar uma lista de Users", async () => {
        const input = { token: 'token-mock-admin', q: "id-mock" }
        const response = await userBusiness.getAllUsers(input)
        expect(response).toHaveLength(2)
    })
    test("Deve retornar um erro caso o usuário não tenha perfil ADMIN", () => {
        const input = { token: 'token-mock-normal', q: "id-mock" }
        expect(async () => {
            await userBusiness.getAllUsers(input)
        }).rejects.toThrow('Você não é um admin para usar esse recurso!')
    })
    test("Deve retornar um erro caso o usuário não tenha perfil ADMIN", () => {
        const input = { token: '', q: "id-mock" }
        expect(async () => {
            await userBusiness.getAllUsers(input)
        }).rejects.toThrow("'token' inválido!")
    })
})