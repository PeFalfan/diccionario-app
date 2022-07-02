import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComentario, ILessonResume } from 'src/app/interfaces/lesson-interface';
import { ILogin } from 'src/app/interfaces/login-interfaces';
import { ILessonsResponseModel, ILogInResponseModel, IResponseModel, IResponseModelLeccion } from 'src/app/interfaces/response-interfaces';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.URL

  constructor(private http: HttpClient) { }

  createComment(commentLeccion: IComentario): Observable<IResponseModel> {
    let urlToHit = this.url + "/addCommentary";
    return this.http.post<IResponseModel>(urlToHit, commentLeccion)
  }

  loadLessons(): Observable<IResponseModelLeccion> {
    let urlToHit = this.url + "/getLessons";
    return this.http.get<IResponseModelLeccion>(urlToHit)
  }

  loadResume(idUser:number):Observable<ILessonsResponseModel> {
    let urlToHit = this.url + "/getLessonResume?userId=" + idUser;
    return this.http.get<ILessonsResponseModel>(urlToHit);
  }

  createUsuario(usuarioDic:IUser):Observable<IResponseModel>{
    let urlToHit = this.url + "/createUser";
    return this.http.post<IResponseModel>(urlToHit, usuarioDic);
  }

  login(loginDic:ILogin):Observable<ILogInResponseModel>{
    let urlToHit = this.url + "/logIn";
    return this.http.post<ILogInResponseModel>(urlToHit,loginDic);
  }

  getSummary():Observable<IResponseModel>{
    return this.http.get<IResponseModel>(this.url+"/getResume");
  }

  approvedLesson(idUser:number, idLesson:number):Observable<IResponseModel> {
    let urlToHit = this.url + "/approveLesson?userId="+idUser+"&lessonId=" + idLesson;
    return this.http.get<IResponseModel>(urlToHit);
  }
}
