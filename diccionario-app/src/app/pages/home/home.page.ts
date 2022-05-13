import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(public rutaActiva: ActivatedRoute, private servicioLogin: UsuarioService) 
  { this.servicioLogin.verificarSesion();}
    
  ngOnInit() {
  }

cerrarSesion(){
  this.servicioLogin.desmarcaUsuario();
  this.volverLogin();
}

volverLogin(){
  window.location.assign('/log-in')
}

}
