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
    /*this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db:SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (CLIENTNAME VARCHAR(100), CLIENTLASTNAME VARCHAR (100), CLIENTPHONE VARCHAR (12), CLIENTMAIL VARCHAR(100), CLIENTPASSWORD (20), STATUS CHAR (3))', []).then(() => {
        console.log('TABLA CREADA OK');      
    }).catch(e => {
      console.log('TABLA NO OK');
    })  
   }).catch(e => {
    console.log('BASE DE DATOS NO OK');
   })*/
   this.sqlite.create({
    name: 'datos.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    console.log('BASE DE DATOS OK');
    db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(CLIENTMAIL VARCHAR(75), CLIENTPASSWORD VARCHAR(30), STATUS CHAR(3))', []).then(() => {
      console.log('TABLA CREADA OK')
    }).catch(e => {
      console.log('TABLA CON ERROR');
    })
  }).catch(e => {
    console.log('BASE DE DATOS CON ERROR');
  })
  }


  almacenarUsuario() {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('BASE DE DATOS OK');
      db.executeSql('INSERT INTO USUARIO (CLIENTMAIL, CLIENTPASSWORD, STATUS) VALUES("p@p.cl", "1234", "OUT")', []).then(() => {
        console.log('USUARIO CREADO CORRECTAMENTE')
      }).catch(e => {
        console.log('USUARIO CON ERROR');
      })
    }).catch(e => {
      console.log('BASE DE DATOS CON ERROR');
    })
  }
  
  marcaUsuario() {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE USUARIO SET STATUS = "IN"', []).then(() => {
        console.log('CAMBIO A IN')
      }).catch(e => {
        console.log('LOGIN NO CAMBIO A IN');
      })
    }
    ).catch(e => {
      console.log('BASE DE DATOS CON ERROR');
    })
  }


  desmarcaUsuario() {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE USUARIO SET STATUS = "OUT"', []).then(() => {
        console.log('CAMBIO A OUT')
      }).catch(e => {
        console.log('LOGIN NO CAMBIO A OUT');
      })
    }
    ).catch(e => {
      console.log('BASE DE DATOS CON ERROR');
    })
  }

  async verificarSesion() {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('BASE DE DATOS OK');
      return db.executeSql('SELECT COUNT (STATUS) AS CANTIDAD FROM USUARIO WHERE STATUS = "IN"', []).then((data) => {
        console.log('CONTEO DE USUARIO LOGUEADO OK')
        if (data.rows.item(0).CANTIDAD === 0) {
          console.log('USUARIO DESLOGUEADO')
          return 'NO-LOGUEADO'; // USUARIO NO ESTA LOGUEADO
        }
        else {
          console.log('USUARIO LOGUEADO')
          return true; // USUARIO LOGUEADO
        }
      })
    }
    )
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
