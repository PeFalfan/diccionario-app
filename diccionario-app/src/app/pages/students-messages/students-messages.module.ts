import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsMessagesPageRoutingModule } from './students-messages-routing.module';

import { StudentsMessagesPage } from './students-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsMessagesPageRoutingModule
  ],
  declarations: [StudentsMessagesPage]
})
export class StudentsMessagesPageModule {}
