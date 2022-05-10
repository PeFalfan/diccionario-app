import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ILogin } from 'src/app/interfaces/login-interfaces';
import {UsuarioService} from '../../services/usuario/usuario.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
clientEmailLogin: string= "";
clientPasswordLogin: string="";

  constructor(public navctrl: NavController, private servicioLogin: UsuarioService) { }
  login: ILogin = {
    email: "",
    password:""
  }
  ngOnInit() {
  }

validarLogin(){
  var correo= this.clientEmailLogin
  var contrasena= this.clientPasswordLogin
  this.login.email= correo
  this.login.password= contrasena

  if(correo!="" && contrasena!=""){
    console.log("login ok")
    this.servicioLogin.login(this.login).subscribe(resp => {
      if (Number (resp.data)== 1){
        this.navctrl.navigateRoot("home")
      }else{
        console.log("login no ok")
      }
    } )
  }else{
    console.log("login no ok")
  }
}

}
