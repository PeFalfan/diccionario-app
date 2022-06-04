import { Component, OnInit } from '@angular/core';
import { ILeccion } from 'src/app/interfaces/lesson-interface';
import { UserService } from 'src/app/services/user/usuario.service';

@Component({
  selector: 'app-document-download',
  templateUrl: './document-download.page.html',
  styleUrls: ['./document-download.page.scss'],
})
export class DocumentDownloadPage implements OnInit {

  leccionSeleccionada: string = '';
  lessons: Array<ILeccion>


  constructor(private serviceUsuario: UserService) { }

  ngOnInit() {
    this.cargaLecciones();

  }
  cargaLecciones() {
    console.log("Peter: servicio carga de lecciones")
    this.serviceUsuario.loadLessons().subscribe(resp => {
      this.lessons = resp.data
      console.log("Peter: servicio carga de lecciones" + resp.data)
    })
  }

}
