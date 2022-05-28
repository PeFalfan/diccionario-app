import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.page.html',
  styleUrls: ['./new-word.page.scss'],
})
export class NewWordPage implements OnInit {

  palabraEsp: string = ''
  palabraRapa: string = ''

  constructor(private alertController: AlertController, public navController: NavController) { }

  ngOnInit() {
  }

  cancelarPalabra() {
    this.navController.navigateRoot('home')
  }

  limpiarFormulario() {
    this.palabraEsp = ''
    this.palabraRapa = ''
  }

  guardarPalabra() {
    var palabraEsp = this.palabraEsp
    var palabraRapa = this.palabraRapa;

    if (palabraEsp == '' || palabraRapa == '') {
      this.camposVacios();
    }
    else {
      this.AlertaPalabra();
    }
  }

  async AlertaPalabra() {
    console.log('palabra Español', this.palabraEsp)
    console.log('palabra Rapa', this.palabraRapa)
    const alert = await this.alertController.create({
      header: 'Palabra Cargada Correctamente',
      buttons:
        [
          {
            text: 'Ir al inicio',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: () => {
              console.log('Inicio');
              this.navController.navigateRoot('home')
            }
          }, {
            text: 'Cargar otra palabra',
            id: 'confirm-button',
            handler: () => {
              console.log('Otra palabra');
              window.location.reload();
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async camposVacios() {
    console.log('faltan palabras')
    const alert = await this.alertController.create({
      header: 'Por favor rellene ambos campos con palabras',
      buttons:
        [
          {
            text: 'Ir al inicio',
            cssClass: 'secondary',
            id: 'confirm-button',
            handler: () => {
              console.log('Inicio');
              this.navController.navigateRoot('home')
            }
          }, {
            text: 'Volver a cargar palabra',
            role: 'cancel',
            id: 'cancel-button',
            handler: () => {
              console.log('Otra palabra');
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

}
