import { IDictionary, ILeccion } from "./lesson-interface"
import { IUser } from "./user-interfaces"

export interface IResponseModel {
    error: string,
    messageResponse: string,
    data: {}
}

export interface IDictionaryResponseModel {
    error: string,
    messageResponse: string,
    data: IDictionary
}

export interface IResponseModelLeccion {
    error: string,
    messageResponse: string,
    data: Array<ILeccion>
}

export interface ILogInResponseModel {
    error: string,
    messageResponse: string,
    data: IUser
}