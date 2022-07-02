import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ILeccion, ILessonResume, IPregunta } from 'src/app/interfaces/lesson-interface';
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
  lastLessonApproved:number = 0;
  percent:number = 0;
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
  lessonsResumes:Array<ILessonResume> = []

  constructor(private router: Router, 
              private serviceUsuario: UserService,
              private dbService: DatabaseService,
              private alertController : AlertController) { }

  ngOnInit() {
    
    this.loadUser();
  
    this.cargaLecciones();

  }

  loadPersonalLessonsStats(){
    this.serviceUsuario.loadResume(this.inSessionUser.idUser).subscribe(resp => {
      this.lessonsResumes = resp.data;
      

      this.lessonsResumes.forEach( ele => {

        if (ele.stateLesson == 2) {
          this.lastLessonApproved = ele.idLesson
        }


        console.log("ultima aprobada en personal: Leccion " + ele.idLesson + " Estado: " + ele.stateLesson)
      })

      // calcular procentage

      this.percent = (this.lastLessonApproved / 7); 

      console.log("ultima post calculo inicial" + this.percent)
      
      this.percent = parseFloat(this.percent.toFixed(2));
      
      console.log("ultima postFixed " + this.percent)

    })
  }

  loadUser(){
    this.dbService.loadUserInSession().then((resp:IUser) =>{
      this.inSessionUser = resp;
      this.loadPersonalLessonsStats();
    })
  }

  cargarLeccion(lesson:ILeccion) {

    if(this.lastLessonApproved +1 >= this.lessonsResumes[lesson.idLeccion - 1].idLesson){
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

      this.alertaErrorLeccion();
      
    }
  }

  async alertaErrorLeccion() {
    const alert = await this.alertController.create({
      header: 'Ojito!',
      message: 'Debes completar las lecciones previas para ingresar a esta!',
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

  cargaLecciones() {
    this.serviceUsuario.loadLessons().subscribe(resp => {
      this.lessons = resp.data
    })
  }

}
