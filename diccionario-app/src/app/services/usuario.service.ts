import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComentario } from '../interfaces/comentario';
import { IResponseModel } from '../interfaces/response-interfaces';
import { IResponseModelLeccion } from '../interfaces/respuestaLeccion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = environment.URL

  constructor(private http: HttpClient) { }

  createComment(commentLeccion: IComentario): Observable<IResponseModel> {
    let urlToHit = this.url + "/createComment";
    return this.http.post<IResponseModel>(urlToHit, commentLeccion)
  }

  loadLessons(): Observable<IResponseModelLeccion> {
    let urlToHit = this.url + "/getLessons";
    return this.http.get<IResponseModelLeccion>(urlToHit)
  }
}
