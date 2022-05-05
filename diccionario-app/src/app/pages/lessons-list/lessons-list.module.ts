import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonsListPageRoutingModule } from './lessons-list-routing.module';

import { LessonsListPage } from './lessons-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsListPageRoutingModule
  ],
  declarations: [LessonsListPage]
})
export class LessonsListPageModule {}
