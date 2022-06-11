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

errorCorreo : boolean = false;
errorePass : boolean = false
errorFono : boolean = false;



usuario: IUser =  {
  clientName: '',
  clientLastNames: '',
  clientPhone: '',
  idUser: 0,
  clientEmail: '',
  clientPassword: '',
  userType: 2,
  remember: false
}

  constructor(public navctrl: NavController, private servicioUsuario: UserService) { }

  ngOnInit() {
  }



  validarCorreo(){
    var correo = this.clientEmail
    if (correo.indexOf('@duocuc.cl') >= 0) {
      console.log('correo ok')
      this.errorCorreo = false
    }
    else {
      this.errorCorreo = true
      console.log('correo no ok')
    }
  }

  validarCampos(){


    
    if(
      this.clientName != "" && this.clientLastNames != "" && this.clientPhone !=""
      && this.clientEmail != "" && this.clientPassword != "" && this.clientRepeatPassword != ""
    ){
          //objeto
    this.usuario.clientEmail= this.clientEmail 
    this.usuario.clientLastNames= this.clientLastNames
    this.usuario.clientName= this.clientName
    this.usuario.clientPassword= this.clientPassword
    this.usuario.clientPhone= this.clientPhone
      alert("campos ok")
    }else{
      alert("campos vacios")
    }

  }

  validarFono(){
    var fono= this.clientPhone
    if(fono.length == 12){
      console.log("fono ok")
      this.errorFono = false
    }else{
      console.log("fono no ok")

      this.errorFono = true
    }
  }
  

validarContrasena(){
  var contrasena= this.clientPassword
  console.log("texto"+contrasena)
  var regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{3,}$/
  if (regex.test(contrasena)) {
        console.log("contraseña ok")
        this.errorePass = false
      }
  else {
    this.errorePass = true
        console.log("contraseña no ok")
      }
  }

 validarContrasena2(){
   var contrasena= this.clientPassword
   var contrasena2= this.clientRepeatPassword
   if ( contrasena === contrasena2 ){
     console.log("contrasena iguales")
   }else{
     alert("contrasena distintas")
   }
 }

 validarRegistro(){


    this.servicioUsuario.createUsuario(this.usuario).subscribe( resp => {

      alert("usuario: " + this.usuario.clientName)

      if ( Number(resp.data) == 1 ){
  
        this.navctrl.navigateRoot("log-in")
  
      } else {
        alert("registro no ok")
      }
    } )
 }

 ejecutarPorqueNoSeMeOcurreOtroNombre(){

  this.validarCampos(); 
  this.validarContrasena2();

  if (this.errorCorreo == false && this.errorFono == false && this.errorePass == false){
    alert("Happy Path")

    this.validarRegistro()
  }

 }

}
