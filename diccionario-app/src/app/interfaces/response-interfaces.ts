import { IDocumento } from "./documento"
import { IDictionary, ILeccion, ILessonResume, IStudentSummary } from "./lesson-interface"
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

export interface ISummaryResponseModel {
    error: string,
    messageResponse: string,
    data: Array<IStudentSummary>
}

export interface IDownloadDocumentResponseModel {
    error: string,
    messageResponse: string,
    data: Array<IDocumento>
}

export interface ILessonsResponseModel {
    error: string,
    messageResponse: string,
    data: Array<ILessonResume>
}