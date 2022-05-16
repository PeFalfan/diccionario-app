import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComentario } from '../interfaces/comentario';
import { IresponseModel } from '../interfaces/response-interface';
import { IresponseModelLeccion } from '../interfaces/respuestaLeccion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = environment.URL

  constructor(private http: HttpClient) { }

  createComment(commentLeccion: IComentario): Observable<IresponseModel> {
    let urlToHit = this.url + "/createComment";
    return this.http.post<IresponseModel>(urlToHit, commentLeccion)
  }

  createLeccion(): Observable<IresponseModelLeccion> {
    let urlToHit = this.url + "/getLessons";
    return this.http.get<IresponseModelLeccion>(urlToHit)
  }
}
