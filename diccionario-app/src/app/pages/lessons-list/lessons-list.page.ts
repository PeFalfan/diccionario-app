import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ILeccion } from 'src/app/interfaces/leccion';
import { IPregunta } from 'src/app/interfaces/preguntas';
import { IresponseModelLeccion } from 'src/app/interfaces/respuestaLeccion';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.page.html',
  styleUrls: ['./lessons-list.page.scss'],

})
export class LessonsListPage implements OnInit {

  /*leccion: ILeccion = {
    idLeccion: 1,
    tituloLeccion: 'Leccion 1',
    preguntas: [{ idLeccion: 1, idPregunta: 1, textoPregunta: 'pregunta 1', palabraDiccionario: 'hola' }, { idLeccion: 1, idPregunta: 2, textoPregunta: 'pregunta 2', palabraDiccionario: 'chao' }, { idLeccion: 1, idPregunta: 3, textoPregunta: 'pregunta 3', palabraDiccionario: 'caca' }, { idLeccion: 1, idPregunta: 4, textoPregunta: 'pregunta 4', palabraDiccionario: 'dfgfdgd' }]
  }

  lecciones: IresponseModelLeccion = {
    error: 'error',
    messageResponse: 'errorergeoeoroege',
    data: [{
      idLeccion: 1,
      tituloLeccion: 'Leccion 1',
      preguntas: [{ idLeccion: 1, idPregunta: 1, textoPregunta: 'pregunta 1', palabraDiccionario: 'hola' }, { idLeccion: 1, idPregunta: 2, textoPregunta: 'pregunta 2', palabraDiccionario: 'chao' }, { idLeccion: 1, idPregunta: 3, textoPregunta: 'pregunta 3', palabraDiccionario: 'caca' }, { idLeccion: 1, idPregunta: 4, textoPregunta: 'pregunta 4', palabraDiccionario: 'dfgfdgd' }]
    },
    {
      idLeccion: 2,
      tituloLeccion: 'Leccion 2',
      preguntas: [{ idLeccion: 2, idPregunta: 1, textoPregunta: 'pregunta 1', palabraDiccionario: 'hola' }, { idLeccion: 2, idPregunta: 2, textoPregunta: 'pregunta 2', palabraDiccionario: 'chao' }, { idLeccion: 2, idPregunta: 3, textoPregunta: 'pregunta 3', palabraDiccionario: 'caca' }, { idLeccion: 2, idPregunta: 4, textoPregunta: 'pregunta 4', palabraDiccionario: 'dfgfdgd' }]
    }]
  }*/

  pregunta: Array<IPregunta>
  lecciones: Array<ILeccion>
  leccionAEnviar: ILeccion

  constructor(private router: Router, public navController: NavController, private ServiceUsuario: UsuarioService) { }

  ngOnInit() {
    this.cargaLecciones();

  }

  cargarLeccion(id) {
    this.lecciones.forEach(element => {
      if (element.idLeccion == id) {
        this.leccionAEnviar = element
      }
    });
    this.router.navigate(['lesson-detail'], {
      state: {
        data: this.leccionAEnviar
      }
    })

  }

  cargaLecciones() {
    this.ServiceUsuario.createLeccion().subscribe(resp => {
      this.lecciones = resp.data
    })
  }

  /*validarCorreo() {

    console.log(this.modeloCorreo)
    console.log(this.modeloContrasena)
    var correo = this.modeloCorreo
    var contrasena = this.modeloContrasena
    var regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (correo.indexOf('@duocuc.cl') >= 0) {
      console.log('correo ok')

    }
    else {
      console.log('correo no ok')
    }
    if (regex.test(contrasena)) {
      console.log('contrase;a ok')
    }
    else {
      console.log('contrasena no ok')
    }
    console.log('largo de input', contrasena.length)
  }*/
}
