import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ILogin } from 'src/app/interfaces/login-interfaces';
import { ILogInResponseModel } from 'src/app/interfaces/response-interfaces';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { DatabaseService } from 'src/app/services/database/database.service';
import { UserService } from 'src/app/services/user/usuario.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  clientEmail: string;
  clientPassword: string;
  checkLogin: boolean;
  logIn: ILogin = {
    email: '',
    password: ''
  }

  loggedUser: IUser = {
    clientName: '',
    clientLastNames: '',
    clientPhone: '',
    idUser: 0,
    clientEmail: '',
    clientPassword: '',
    userType: 0,
    remember: false
  }

  logCorrecto: boolean = false;

  constructor(private dbService: DatabaseService,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // primero, al iniciar, validamos que el ultimo usuario en la bd quiere ser recordado o no:
    try {
      this.dbService.loadUserInSession().then((resp: IUser) => {

        let usuario: IUser = resp;
        this.loggedUser = usuario;

        if (resp != undefined && resp != null) {

          this.logCorrecto = true;

        } else {

          this.logCorrecto = false;
        }

        this.wantedToBeRemembered();

      }).catch(e => {

        console.log("Error en llamada a bd local: " + e.message)
        this.logCorrecto = false

      })

    } catch (error) {

      console.log("Error en carga desde LOCAL: " + error.message)
      this.logCorrecto = false

    }

  }

  wantedToBeRemembered() {
    // si quiere ser recordado, con sus datos, navegamos directamente al home, enviando al usuario que tenemos en la bd local
    if (this.loggedUser.remember) {
      this.toHome();
    }
  }

  // validaciones primarias para el input de log IN (correo / contraseña)
  validateInputs() {

    let title;
    let message;
    // de momento se valida que se esté entregando algo, hay que hacer la validación de que tenga un @ o cualquier cosa,
    // de más está decir que esta validación se debe agregar como un 'else if'.
    if (this.clientEmail == "" || this.clientPassword == "") {

      title = "Error de ingreso";
      message = "Favor completar campos correo/contraseña";
      this.modelAlert(title, message);
      this.logCorrecto = false

    } else {

      title = "Ingreso de usuario";

      this.logIn.email = this.clientEmail;

      this.logIn.password = this.clientPassword;

      this.userService.login(this.logIn).subscribe((resp: ILogInResponseModel) => {

        this.loggedUser = resp.data;

        if (this.loggedUser == null || this.loggedUser == undefined) {

          message = "Credenciales incorrectas."
          this.logCorrecto = false
          this.modelAlert(title, message);

        } else {

          message = "Ingreso correcto de usuario. \n"

          if (this.checkLogin) {

            message += "Se recordará al usuario!"

          }

          this.logCorrecto = true;

          this.rememberSession();
          this.modelAlert(title, message);
          this.toHome();

        }

      });

    }

  }

  // generic alert to give feedback to the user
  async modelAlert(title, messages) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: messages,
      buttons: [{
        text: 'Okay',
        id: 'confirm-button',
        handler: () => {
          if (messages != "Credenciales incorrectas." && messages != "Favor completar campos correo/contraseña") {
            this.logCorrecto = true;
            this.toHome();
          }
        }
      }
      ]
    });

    await alert.present();
  }

  // valida el checkbox, seleccionado para recordar.
  rememberSession() {

    this.loggedUser.remember = this.checkLogin

    this.dbService.saveUser(this.loggedUser);

  }

  // navegacion a HOME
  toHome() {

    if (this.logCorrecto) {
      this.router.navigate(['home'], {
        state: {
          data: this.loggedUser
        }
      });
    }
  }
}