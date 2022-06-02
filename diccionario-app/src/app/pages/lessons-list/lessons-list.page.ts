import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ILeccion, IPregunta } from 'src/app/interfaces/lesson-interface';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { DatabaseService } from 'src/app/services/database/database.service';
import { UserService } from 'src/app/services/user/usuario.service';


@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.page.html',
  styleUrls: ['./lessons-list.page.scss'],

})
export class LessonsListPage implements OnInit {

  pregunta: Array<IPregunta>
  lessons: Array<ILeccion>
  leccionAEnviar: ILeccion
  lastLessonApproved:number
  inSessionUser : IUser = {
    clientName: '',
    clientLastNames: '',
    clientPhone: '',
    idUser: 0,
    clientEmail: '',
    clientPassword: '',
    userType: 0,
    remember: false
  }

  constructor(private router: Router, 
              private navController: NavController, 
              private serviceUsuario: UserService,
              private dbService: DatabaseService) { }

  ngOnInit() {

    this.cargaLecciones();

    this.loadUser();

  }

  loadUser(){
    this.dbService.loadUserInSession().then((resp:IUser) =>{
      this.inSessionUser = resp;
    })
  }

  lastApproved(){
    this.lessons.forEach(les => {
      if (les.estadoLeccion == 2){
        this.lastLessonApproved = les.idLeccion
      }
    })
    if (this.lastLessonApproved == undefined){
      this.lastLessonApproved = 1;
    }
  }

  cargarLeccion(lesson:ILeccion) {
    this.lastApproved();
    if(this.lastLessonApproved +1 >= lesson.idLeccion){
      this.lessons.forEach(element => {
        if (element.idLeccion == lesson.idLeccion) {
          this.leccionAEnviar = element
        }
      });
      this.router.navigate(['lesson-detail'], {
        state: {
          data: this.leccionAEnviar
        }
      })
    } else {
      alert("Debes completar las lecciones anteriores a esta.")
    }
  }

  cargaLecciones() {
    console.log("Peter: servicio carga de lecciones")
    this.serviceUsuario.loadLessons().subscribe(resp => {
      this.lessons = resp.data
      console.log("Peter: servicio carga de lecciones" + resp.data)
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
