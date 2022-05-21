import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-document-load',
  templateUrl: './document-load.page.html',
  styleUrls: ['./document-load.page.scss'],
})
export class DocumentLoadPage implements OnInit {
  documento: string = '';
  comentarioDocumento: string = '';

  constructor(private alertController: AlertController, public navController: NavController) { }

  ngOnInit() {

  }
  validarDocumento() {
    var documentoCargado = this.documento;

    if (documentoCargado == '') {
      this.sinDocumento();
    }
    else {
      this.AlertaDocumento();
    }
  }

  async AlertaDocumento() {
    console.log('comentario', this.comentarioDocumento)
    console.log('documento', this.documento)
    const alert = await this.alertController.create({
      header: 'Archivo cargado correctamente',
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
            text: 'Cargar otro documento',
            id: 'confirm-button',
            handler: () => {
              console.log('Otro documento');
              window.location.reload();
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async sinDocumento() {
    console.log('sin documento cargado')
    const alert = await this.alertController.create({
      header: 'Por favor seleccione un documento para cargar',
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
            text: 'Volver a cargar documento',
            role: 'cancel',
            id: 'cancel-button',
            handler: () => {
              console.log('Otro documento');
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }



  cancelarDocumento() {
    this.navController.navigateRoot('home')
  }
}
