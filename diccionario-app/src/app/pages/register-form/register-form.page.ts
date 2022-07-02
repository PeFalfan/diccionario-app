import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { IUser } from 'src/app/interfaces/user-interfaces';
import { UserService } from 'src/app/services/user/usuario.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

  clientName: string = "";
  clientLastNames: string = "";
  clientPhone: string = "";
  clientEmail: string = "";
  clientPassword: string = "";
  clientRepeatPassword: string = "";

  errorCorreo: boolean = false;
  errorPass: boolean = false
  errorFono: boolean = false;

  usuario: IUser = {
    clientName: '',
    clientLastNames: '',
    clientPhone: '',
    idUser: 0,
    clientEmail: '',
    clientPassword: '',
    userType: 2,
    remember: false
  }

  constructor(
    public navctrl: NavController,
    private servicioUsuario: UserService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  validarCorreo() {
    var correo = this.clientEmail
    if (correo.indexOf('@') >= 0) {
      console.log('correo ok')
      this.errorCorreo = false
    }
    else {
      this.errorCorreo = true
      console.log('correo no ok')
    }
  }

  validarCampos() {

    if (
      this.clientName != "" && this.clientLastNames != "" && this.clientPhone != ""
      && this.clientEmail != "" && this.clientPassword != "" && this.clientRepeatPassword != ""
    ) {

      this.validarCorreo();

      if (this.errorCorreo) {

        this.alertaErrorCorreo();

      } else {

        this.validarContrasena2();

        if ( this.errorPass){

          this.alertaErrorPass();

        } else {
          
          //objeto
          this.usuario.clientName = this.clientName
          this.usuario.clientLastNames = this.clientLastNames
          this.usuario.clientPhone = this.clientPhone
          this.usuario.clientEmail = this.clientEmail
          this.usuario.clientPassword = this.clientPassword
          this.usuario.userType = 2;
          
        }

      }

    } else {

      this.alertaErrorCampos()

    }

  }

  async alertaErrorCorreo() {
    const alert = await this.alertController.create({
      header: 'Error en formulario',
      message: 'Correo no válido',
      buttons:
        [
          {
            text: 'OK',
            cssClass: 'secondary',
            id: 'confirm-button',
            handler: () => {
              console.log('Error');
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async alertaErrorCampos() {
    const alert = await this.alertController.create({
      header: 'Error en formulario',
      message: 'Favor completar todos los campos',
      buttons:
        [
          {
            text: 'OK',
            cssClass: 'secondary',
            id: 'confirm-button',
            handler: () => {
              console.log('Error');
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async alertaErrorPass() {
    const alert = await this.alertController.create({
      header: 'Error en formulario',
      message: 'Favor validar contraseñas',
      buttons:
        [
          {
            text: 'OK',
            cssClass: 'secondary',
            id: 'confirm-button',
            handler: () => {
              console.log('Error');
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  validarFono() {
    var fono = this.clientPhone
    if (fono.length == 12) {
      console.log("fono ok")
      this.errorFono = false
    } else {
      console.log("fono no ok")

      this.errorFono = true
    }
  }

  validarContrasena2() {
    var contrasena = this.clientPassword
    var contrasena2 = this.clientRepeatPassword
    if (contrasena === contrasena2) {
      console.log("contrasena iguales")
      this.errorPass == false;
    } else {
      this.errorPass = true;
    }
  }

  async alertaRegistroOK() {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: 'Usuario registrado correctamente!',
      buttons:
        [
          {
            text: 'OK',
            cssClass: 'secondary',
            id: 'confirm-button',
            handler: () => {
              this.navctrl.navigateRoot("log-in")
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  validarRegistro() {


    this.servicioUsuario.createUsuario(this.usuario).subscribe(resp => {

      if (Number(resp.data) == 1) {

        this.alertaRegistroOK();

      } else {

        this.alertaErrorServicio();

      }
    })
  }

  ejecutarPorqueNoSeMeOcurreOtroNombre() {

    this.validarCampos();

    if (this.errorCorreo == false && this.errorFono == false) {

      this.validarRegistro()

    }

  }

  async alertaErrorServicio() {
    const alert = await this.alertController.create({
      header: 'Error al registrar',
      message: 'Error en servicio de registro',
      buttons:
        [
          {
            text: 'OK',
            cssClass: 'secondary',
            id: 'confirm-button',
            handler: () => {
              console.log('Error');
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}


