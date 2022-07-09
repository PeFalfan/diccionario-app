import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { IDocumento } from 'src/app/interfaces/documento';
import { ILeccion } from 'src/app/interfaces/lesson-interface';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { UserService } from 'src/app/services/user/usuario.service';

@Component({
  selector: 'app-document-load',
  templateUrl: './document-load.page.html',
  styleUrls: ['./document-load.page.scss'],
})
export class DocumentLoadPage implements OnInit {
  documento: IDocumento = {
    idDocument: 0,
    nameDocument: '',
    document: '',
    idLesson: 0
  };
  comentarioDocumento: string = '';
  leccionSeleccionada: ILeccion;
  lessons: Array<ILeccion>
  file!: File;
  succesfullLoad = true;

  constructor(
    private alertController: AlertController, 
    public navController: NavController, 
    private serviceUsuario: UserService,
    private documentService: DocumentsService,
    private router: Router) { }

  ngOnInit() {

    this.cargaLecciones();

  }

  async validarDocumento() {
    var documentoCargado = this.documento.document;

    if (documentoCargado == '') {
      this.sinDocumento();
    }
    else {
      this.uploadDocument();

      await new Promise(f => setTimeout(f, 4000));

      this.AlertaDocumento();
    }
  }

  async AlertaDocumento() {
    if (this.succesfullLoad){
      const alert = await this.alertController.create({
        header: 'Archivo cargado correctamente',
        buttons:
          [
            /*
            {
              text: 'Ir al inicio',
              role: 'cancel',
              cssClass: 'secondary',
              id: 'cancel-button',
              handler: () => {
                console.log('Inicio');
                this.router.navigate(['home'])
              }
            }, */{
              text: 'OK',
              id: 'confirm-button',
              handler: () => {
                window.location.reload();
              }
            }
          ]
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }else{
      const alert = await this.alertController.create({
        header: 'Error al cargar archivo',
        buttons:
          [
            /*
            {
              text: 'Ir al inicio',
              role: 'cancel',
              cssClass: 'secondary',
              id: 'cancel-button',
              handler: () => {
                console.log('Inicio');
                this.navController.navigateRoot('home')
              }
            }, 
            */{
              text: 'OK',
              id: 'confirm-button',
              handler: () => {
                window.location.reload();
              }
            }
          ]
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }

  }

  uploadDocument(){
    this.documentService.uploadDocument(this.documento).subscribe(resp => {

      if (resp.data == 1){
        this.succesfullLoad = true;
      } else {
        this.succesfullLoad = false;
      }
    })
  }

  async sinDocumento() {
    const alert = await this.alertController.create({
      header: 'Por favor seleccione un documento y una leccion para cargar',
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

  cargaLecciones() {
    console.log("Peter: servicio carga de lecciones")
    this.serviceUsuario.loadLessons().subscribe(resp => {
      this.lessons = resp.data
      console.log("Peter: servicio carga de lecciones" + resp.data)
    })

    this.leccionSeleccionada = this.lessons[0]
  }

  toBase64(event: any) {

    this.file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.documento.idDocument = 0
      this.documento.nameDocument = this.file.name
      this.documento.idLesson = Number(this.leccionSeleccionada.idLeccion);
      const res: string = reader.result as string
      this.documento.document = res.slice(28)

    };
    reader.onerror = (error) => {
      console.log(error);
    }

  }

}

