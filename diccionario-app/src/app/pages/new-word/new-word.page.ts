import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ITerm } from 'src/app/interfaces/leccion';
import { IResponseModel } from 'src/app/interfaces/response-interfaces';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.page.html',
  styleUrls: ['./new-word.page.scss'],
})
export class NewWordPage implements OnInit {

  palabraEsp: string = ''
  palabraRapa: string = ''
  file: File
  newTerm: ITerm = {
    word: '',
    traslation: '',
    pronunciation: ''
  }


  constructor(private alertController: AlertController, 
              private navController: NavController,
              private dictionaryService: DictionaryService) { }

  ngOnInit() {
  }

  wavToBase64(event:any){
    this.file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      const res: string = reader.result as string
      
      this.newTerm.pronunciation = res.slice(22);
      alert("base64?"+this.newTerm.pronunciation)
    };
    reader.onerror = (error) => {
      alert(error);
    }
  }

  cancelarPalabra() {
    this.navController.navigateRoot('home')
  }

  limpiarFormulario() {
    this.palabraEsp = ''
    this.palabraRapa = ''
    this.newTerm.word = this.palabraEsp;
    this.newTerm.traslation = this.palabraRapa;
  }

  guardarPalabra() {
    var palabraEsp = this.palabraEsp;
    var palabraRapa = this.palabraRapa;

    if (palabraEsp == '' || palabraRapa == '') {
      this.camposVacios();
    }
    else {
      this.newTerm.word = this.palabraEsp;
      this.newTerm.traslation = this.palabraRapa;
      this.dictionaryService.addNewTerm(this.newTerm).subscribe((resp:IResponseModel) => {
        if (resp.data != null){
          this.AlertaPalabra();
        }else{
          alert("Error: " + resp.error)
        }
      })
      
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
