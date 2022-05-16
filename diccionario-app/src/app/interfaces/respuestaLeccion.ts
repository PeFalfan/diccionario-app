import { ILeccion } from "./leccion";

export interface IresponseModelLeccion {
    error: string,
    messageResponse: string,
    data: Array<ILeccion>
}