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

export interface IComentario {
    idCommentary: number,
    commentary: string,
    idLesson: number,
    idUser: number
    creationDate: Date
}

export interface IPregunta {
    idLeccion: number,
    idPregunta: number,
    textoPregunta: string,
    palabraDiccionario: string
}

export interface IStudentSummary {
    studentName: string,
    lessons: string,
    percentage: string
}

export interface ILessonResume {
    userId : number,
    idLesson : number,
    stateLesson: number
}