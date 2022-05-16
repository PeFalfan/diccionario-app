import { IPregunta } from "./preguntas";

export interface ILeccion {
    idLeccion: number,
    tituloLeccion: string,
    preguntas: Array<IPregunta>
}