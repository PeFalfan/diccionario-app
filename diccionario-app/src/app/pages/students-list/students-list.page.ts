import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { IStudentSummary } from 'src/app/interfaces/lesson-interface';
import { ISummaryResponseModel } from 'src/app/interfaces/response-interfaces';
import { UserService } from 'src/app/services/user/usuario.service';
export interface Data {
  students: string;
}
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentsListPage implements OnInit {
  public data: Data;
  public columns: any;
  rows: Array<IStudentSummary>

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
    this.initTable();
  }

  initTable(){
    // configuracion de columnas para la tabla
    this.columns = [
      { name: 'studentName' },
      { name: 'lessons' },
      { name: 'percentage' }
    ];

    // carga de datos a mostrar: la data es de 3 campos, asi que se 
    // prepara un modelo/interface que lo soporte. 
    this.userService.getSummary().subscribe((resp:ISummaryResponseModel) => {
      this.rows = resp.data;
    })

  }



}
