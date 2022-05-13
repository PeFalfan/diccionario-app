import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsListPageRoutingModule } from './students-list-routing.module';

import { StudentsListPage } from './students-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    StudentsListPageRoutingModule
  ],
  declarations: [StudentsListPage]
})
export class StudentsListPageModule { }
