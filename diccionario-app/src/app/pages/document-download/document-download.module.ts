import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentDownloadPageRoutingModule } from './document-download-routing.module';

import { DocumentDownloadPage } from './document-download.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentDownloadPageRoutingModule
  ],
  declarations: [DocumentDownloadPage]
})
export class DocumentDownloadPageModule {}
