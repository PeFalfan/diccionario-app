import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
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
  public rows: any;

  constructor(private http: HttpClient) {

    this.columns = [
      { name: 'Nombre' },
      { name: 'Lecciones' },
      { name: 'Porcentaje' }
    ];
    this.http.get<Data>('../../assets/students-lists.json')
      .subscribe((res) => {
        console.log(res)
        this.rows = res.students;
      });
  }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
  }



}
