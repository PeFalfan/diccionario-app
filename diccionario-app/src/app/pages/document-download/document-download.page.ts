import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { IDocumento } from 'src/app/interfaces/documento';
import { ILeccion } from 'src/app/interfaces/lesson-interface';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { DatabaseService } from 'src/app/services/database/database.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { UserService } from 'src/app/services/user/usuario.service';

@Component({
  selector: 'app-document-download',
  templateUrl: './document-download.page.html',
  styleUrls: ['./document-download.page.scss'],
})
export class DocumentDownloadPage implements OnInit {

  leccionSeleccionada: ILeccion;
  lessons: Array<ILeccion>

  documents: Array<IDocumento>;
  modalName: Uint8Array;
  user:IUser;

  constructor(
    private serviceUsuario: UserService,
    private documentService: DocumentsService,
    private dbService: DatabaseService,
    private alertController: AlertController,
    private navController: NavController) { }

  ngOnInit() {

    this.dbService.loadUserInSession().then(resp => {
      this.user = resp;
    })

    this.cargaLecciones();

    //this.cargaDocumentos();

  }
  cargaLecciones() {
    this.serviceUsuario.loadLessons().subscribe(resp => {
      this.lessons = resp.data
    })
  }

  // cargaDocumentos(){

  //   // this.documentService.downloadDocuments(this.leccionSeleccionada.idLeccion).subscribe(resp => {
  //   //   this.documents = resp.data;
  //   // })

  // }

  sendDocuments(){
    this.documentService.sendDocumentsByEmail(this.leccionSeleccionada.idLeccion, this.user.clientEmail).subscribe( resp => {
      if (resp.data == 1){
        this.alertDocuments();
      }else{
        this.errorAlertDocuments()
      }
    })
  }

  async errorAlertDocuments() {
    const alert = await this.alertController.create({
      header: 'Documentos',
      message: 'Ocurrió un error al momento de enviar los documentos, favor reintentar',
      buttons:
        [
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: () => {
              
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async alertDocuments() {
    const alert = await this.alertController.create({
      header: 'Documentos',
      message: 'Pronto recibirás un correo con los documentos!',
      buttons:
        [
          {
            text: 'Volver al inicio',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: () => {
              console.log('Inicio');
              this.navController.navigateRoot('home')
            }
          }, {
            text: 'Solicitar otros documentos:',
            id: 'confirm-button',
            handler: () => {
              
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  onClickDownloadDoc(doc: IDocumento) {

    alert("Click")

    alert(doc.nameDocument)

    let base64String = doc.document;
    this.downloadPdf(base64String, doc.nameDocument);
  }

  downloadPdf(base64String: string, fileName: string) {

    const dataType = 'pdf';
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: dataType });

    const filePath = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a')
    downloadLink.href = filePath;
    document.body.appendChild(downloadLink)
    downloadLink.download = fileName + '.pdf';
    downloadLink.click()
    URL.revokeObjectURL(filePath)
  }

  getPdfFile(item){  

    alert("New Method")

    let array = new Uint8Array(item);
    let blob = new Blob([array], { type: 'application/pdf' });
    let url = URL.createObjectURL(blob);
    this.modalName = array;
    let fileName: string = new Date().toLocaleDateString();
    try {
      const link = document.createElement('a');
      if (link.download !== undefined) { 
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error('BlobToSaveAs error', e);
    }
  }

}
