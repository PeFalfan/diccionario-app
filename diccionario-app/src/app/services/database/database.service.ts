import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { IUser } from 'src/app/interfaces/user-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'local.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(NOMBRE TEXT, APELLIDOS TEXT, CELULAR TEXT, ID NUMBER, EMAIL TEXT, CONTRASENA TEXT, TIPO NUMBER, RECORDAR BOOLEAN)', []).then(() => {
        console.log('TABLA CREADA OK');
      }).catch(e => {
        console.log('Error tabla no OK: ' + e.message)
      })

    }).catch(e => {
      console.log('Error base de datos NOK: ' + e)
    })
  }

  saveUser(user: IUser) {
    this.clearSession();

    this.sqlite.create({
      name: 'local.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO USUARIO VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [user.clientName, user.clientLastNames, user.clientPhone, user.idUser, user.clientEmail, user.clientPassword, user.userType, user.remember]).then(() => {
        console.log('Peter: REGISTRO REALIZADO OK ' + user.clientName);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.clientLastNames);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.clientPhone);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.idUser);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.clientEmail);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.clientPassword);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.userType);
        console.log('Peter: REGISTRO REALIZADO OK ' + user.remember);
      }).catch(e => {
        console.log('Peter: Error REGISTRO REALIZADO NOK: ' + e.message)
      })

    }).catch(e => {
      console.log('Peter: Error base de datos NOK: ' + e)
    })
  }

  clearSession() {
    this.sqlite.create({
      name: 'local.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM USUARIO', []).then(() => {
        console.log('Peter: SESSION CLEARED OK');
      }).catch(e => {
        console.log('Peter: Error SESSION CLEARED NOK: ' + e.message)
      })

    }).catch(e => {
      console.log('Peter: Error base de datos NOK: ' + e)
    })
  }

  loadUserInSession() {
    return this.sqlite.create({
      name: 'local.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM USUARIO", [])
        .then((data) => {

          var usuarioLocal : IUser = {
            clientName: data.rows.item(0).NOMBRE,
            clientLastNames: data.rows.item(0).APELLIDOS,
            clientPhone: data.rows.item(0).CELULAR,
            idUser: data.rows.item(0).ID,
            clientEmail: data.rows.item(0).EMAIL,
            clientPassword: data.rows.item(0).CONTRASENA,
            userType: data.rows.item(0).TIPO,
            remember: data.rows.item(0).RECORDAR
          }

          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.clientName);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.clientLastNames);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.clientPhone);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.idUser);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.clientEmail);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.clientPassword);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.userType);
          console.log('Peter: REGISTRO CARGADO OK ' + usuarioLocal.remember);

          return usuarioLocal;

        }).catch(e => {

          console.log("Alert error en servicio de carga de datos local: " + e.message)
          return null
        })

    }).catch(e => {

      console.log("Alert error en jjj servicio de carga de datos local: " + e.message)
      return null;
    })
  }

}
