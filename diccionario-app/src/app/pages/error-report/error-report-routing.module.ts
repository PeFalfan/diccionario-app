import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorReportPage } from './error-report.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorReportPageRoutingModule {}
