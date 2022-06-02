import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { IUser } from 'src/app/interfaces/user-interfaces';
import { UserService } from 'src/app/services/user/usuario.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

clientName: string= "";
clientLastNames: string= "";
clientPhone: string= "";
clientEmail: string="";
clientPassword: string= "";
clientRepeatPassword: string= "";

usuario: IUser;

  constructor(public navctrl: NavController, private servicioUsuario: UserService) { }

  ngOnInit() {
  }



  validarCorreo(){
    var correo = this.clientEmail
    if (correo.indexOf('@duocuc.cl') >= 0) {
      console.log('correo ok')
    }
    else {
      console.log('correo no ok')
    }
  }

  validarCampos(){
    var nombre = this.clientName
    var apellido= this. clientLastNames
    var fono= this.clientPhone
    var correo= this.clientEmail
    var contrasena= this.clientPassword
    var contrasena2= this.clientRepeatPassword

    //objeto
    this.usuario.clientEmail= correo 
    this.usuario.clientLastNames= apellido
    this.usuario.clientName= nombre
    this.usuario.clientPassword= contrasena
    this.usuario.clientPhone= fono
    
    if(
      nombre != "" && apellido != "" && fono !=""
      && correo != "" && contrasena != "" && contrasena2 != ""
    ){
      console.log("campos ok")
    }else{
      console.log("campos vacios")
    }

  }

  validarFono(){
    var fono= this.clientPhone
    if(fono.length == 12){
      console.log("fono ok")
    }else{
      console.log("fono no ok")
    }
  }
  

validarContrasena(){
  var contrasena= this.clientPassword
  console.log("texto"+contrasena)
  var regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if (regex.test(contrasena)) {
        console.log("contraseña ok")
      }
  else {
        console.log("contraseña no ok")
      }
  }


 validarContrasena2(){
   var contrasena= this.clientPassword
   var contrasena2= this.clientRepeatPassword
   if(contrasena===contrasena2){
     console.log("contrasena iguales")
   }else{
     console.log("contrasena distintas")
   }
 }

 validarRegistro(){
  this.servicioUsuario.createUsuario(this.usuario).subscribe(resp => {
    if (Number (resp.data)== 1){
      this.navctrl.navigateRoot("log-in")
    }else{
      console.log("registro no ok")
    }
  } )
 }
 

}
