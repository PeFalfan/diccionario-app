import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {
clientRut: string= "";
clientName: string= "";
clientLastNames: string= "";
clientPhone: string= "";
clientEmail: string="";
clientPassword: string= "";
clientRepeatPassword: string= "";

  constructor() { }

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
    var rut= this.clientRut
    var correo= this.clientEmail
    var contrasena= this.clientPassword
    var contrasena2= this.clientRepeatPassword
    if(
      nombre != "" && apellido != "" && fono !="" && rut != ""
      && correo != ""&& contrasena != "" && contrasena2 != ""
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
  validarRut(){
    var rut= this.clientRut
    if(rut.length >= 9 && rut.length <= 10){
      console.log("rut ok")
    }else{
      console.log("rut no ok")
    }
  }

validarContrasena(){
  var contrasena= this.clientPassword
  console.log("texto"+contrasena)
  var regex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&]){8,}$/
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
}
