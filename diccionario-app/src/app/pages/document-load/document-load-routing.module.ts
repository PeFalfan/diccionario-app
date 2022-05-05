import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentLoadPage } from './document-load.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentLoadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentLoadPageRoutingModule {}
