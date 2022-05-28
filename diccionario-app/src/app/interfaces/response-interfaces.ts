import { IDictionary } from "./leccion"

export interface IResponseModel {
    error: string,
    messageResponse: string,
    data: []
}

export interface IDictionaryResponseModel {
    error: string,
    messageResponse: string,
    data: IDictionary
}