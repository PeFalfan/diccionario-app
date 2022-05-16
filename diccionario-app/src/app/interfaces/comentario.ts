import { ILeccion } from "./leccion";

export interface IComentario {

    idComentario: number,
    textoComentario: string,
    idLeccion: number,
    idUsuario: number
}