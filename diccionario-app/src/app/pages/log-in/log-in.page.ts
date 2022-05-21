import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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
checkLogin: boolean= false;

  constructor(public navctrl: NavController, private servicioLogin: UsuarioService, private toastctrl: ToastController) { 
    this.verificarSesion();
  }
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

checkLog(checkLogin){
  if(this.checkLogin== false){
  console.log('CHECK NO MARCADO')
  }else{
    this.marcaUsuario();
   console.log('CHECK MARCADO')
}
}

marcaUsuario() {
  this.servicioLogin.marcaUsuario();

}

almacenarUsuario(){
  this.servicioLogin.almacenarUsuario();{
    this.presentToast();
  }
}

async presentToast() {
  const toast = await this.toastctrl.create({
    message: 'Usuario creado correctamente',
    duration: 3000
  });
  toast.present();
}
async presentToast5() {
  const toast = await this.toastctrl.create({
    message: 'cerdenciales correctas',
    duration: 3000
  });
  toast.present();
}

validarUser() {
  
    if (this.clientEmailLogin === 'p@p.cl' && this.clientPasswordLogin === '1234') {
      this.presentToast5();
      this.navctrl.navigateRoot('home', { queryParams: { 'usuario': this.clientEmailLogin} });
    } else {
      console.log('USUARIO INVALIDO')
    }
  }

  

  verificarSesion() {
    this.servicioLogin.verificarSesion().then((data) => {
      if (data === 'NO-LOGUEADO') {
        console.log('NO HAY USUARIO LOGUEADO')
      }
      else {
        this.validarUser()
        console.log(this.clientEmailLogin + 'MODELO USUARIO DEL LOGIN')
        this.navctrl.navigateRoot('home', { queryParams: { 'usuario': this.clientEmailLogin } });
      };
    });
  }

}


