import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentDownloadPage } from './document-download.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentDownloadPageRoutingModule {}
