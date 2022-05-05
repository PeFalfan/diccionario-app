import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentLoadPageRoutingModule } from './document-load-routing.module';

import { DocumentLoadPage } from './document-load.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentLoadPageRoutingModule
  ],
  declarations: [DocumentLoadPage]
})
export class DocumentLoadPageModule {}
