import { IPregunta } from "./preguntas";

export interface ILeccion {
    idLeccion: number,
    estadoLeccion: number;
    tituloLeccion: string,
    preguntas: Array<IPregunta>
}

export interface ITerm{
    word: string,
    traslation:string,
    pronunciation:string
}

export interface IDictionary {
    terms: Array<ITerm>
}

export interface IAlternatives{
    word: string,
    isCorrect:boolean
}