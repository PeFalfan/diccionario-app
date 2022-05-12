import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
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
  constructor(private http:HttpClient, private sqlite: SQLite) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db:SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (CLIENTNAME VARCHAR(100), CLIENTLASTNAME VARCHAR (100), '+
      'CLIENTPHONE VARCHAR (12), CLIENTMAIL VARCHAR(100), CLIENTPASSWORD (20), STATUS INTEGER (1))', []).then(() => {
        console.log('TABLA CREADA OK');      
    }).catch(e => {
      console.log('TABLA NO OK');
    })  
   }).catch(e => {
    console.log('BASE DE DATOS NO OK');
   })
  }


  createUsuario(usuarioDic:IUsuario):Observable<IResponseModel>{
    let urlToHit = this.url + "/createClient";
    return this.http.post<IResponseModel>(urlToHit,usuarioDic);
  }

  login(loginDic:ILogin):Observable<IResponseModel>{
    let urlToHit = this.url + "/createClient";
    return this.http.post<IResponseModel>(urlToHit,loginDic);
  }
}
