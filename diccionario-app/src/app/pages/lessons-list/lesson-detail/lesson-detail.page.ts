import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.page.html',
  styleUrls: ['./lesson-detail.page.scss'],

})
export class LessonDetailPage implements OnInit {

  constructor(private alertController: AlertController, public navController: NavController) { }

  ngOnInit() {
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
}

