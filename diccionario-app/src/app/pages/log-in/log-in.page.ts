import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
clientEmailLogin: string= "";
clientPasswordLogin: string="";
  constructor(public navctrl: NavController) { }

  ngOnInit() {
  }

validarLogin(){
  var correo= this.clientEmailLogin
  var contrasena= this.clientPasswordLogin
  if(correo==="correo1@duocuc.cl" && contrasena==="1234"){
    console.log("login ok")
    this.navctrl.navigateRoot("home")
  }else{
    console.log("login no ok")
  }
}

}
