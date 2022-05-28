import { ILeccion } from "./leccion";

export interface IResponseModelLeccion {
    error: string,
    messageResponse: string,
    data: Array<ILeccion>
}