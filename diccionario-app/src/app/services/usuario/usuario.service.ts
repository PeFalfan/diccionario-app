import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IUsuario } from 'src/app/interfaces/incripcion-interfaces';
import { ILogin } from 'src/app/interfaces/login-interfaces';
import { IResponseModel}from 'src/app/interfaces/response-interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
url: string= environment.URL
  constructor(private http:HttpClient) { }

  createUsuario(usuarioDic:IUsuario):Observable<IResponseModel>{
    let urlToHit = this.url + "/createClient";
    return this.http.post<IResponseModel>(urlToHit,usuarioDic);
  }

  login(loginDic:ILogin):Observable<IResponseModel>{
    let urlToHit = this.url + "/createClient";
    return this.http.post<IResponseModel>(urlToHit,loginDic);
  }
}
