import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IPregunta } from '../../../interfaces/preguntas';
import { ILeccion } from 'src/app/interfaces/leccion';



@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.page.html',
  styleUrls: ['./lesson-detail.page.scss'],

})
export class LessonDetailPage implements OnInit {

  leccion: ILeccion
  preguntas: Array<IPregunta>



  constructor(private alertController: AlertController, public navController: NavController, private ServiceUsuario: UsuarioService) { }

  ngOnInit() {
    try {
      const params = history.state;
      if (params.data != undefined) {
        this.leccion = params.data
        this.preguntas = this.leccion.preguntas
      }
      else {
        console.log('error al cargar leccion')
      }
    } catch (error) {
      console.log('error al cargar leccion')
    }
  }




  async AlertaLeccion() {

    const alert = await this.alertController.create({
      header: '¿Esta seguro de enviar la lección?',
      message: "No podrá volver atrás después de este paso",
      buttons:
        [
          {
            text: 'Volver',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Cancelar');
            }
          }, {
            text: 'Continuar',
            id: 'confirm-button',
            handler: () => {
              console.log('OK');
              this.navController.navigateRoot('lessons-list')
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async AlertaCancelar() {

    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea abandonar la lección?',
      message: "Perdera todos los avances sin enviar",
      buttons:
        [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Cancelar');
            }
          }, {
            text: 'Salir de la lección',
            id: 'confirm-button',
            handler: () => {
              console.log('OK');
              this.navController.navigateRoot('lessons-list')
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async AlertaComentario() {

    const alert = await this.alertController.create({
      header: 'Ingrese su comentario:',
      inputs: [
        {
          name: 'comentario',
          type: 'textarea',
          placeholder: 'Comentario'
        }],

      buttons:
        [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Cancelar');
            }
          }, {
            text: 'Enviar comentario',
            id: 'confirm-button',
            handler: (alertData) => {
              console.log('OK');
              var comentario = alertData.comentario
              console.log(comentario);
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }


  /*guardarComentario() {
    this.ServiceUsuario.createComment(this.comentario).subscribe(resp => {
      if (Number(resp.data) == 1) {
        console.log('comentario ok')
      }
      else {
        console.log('comentario no ok')
      }
    })
  }*/
}




