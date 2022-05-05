import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorReportPageRoutingModule } from './error-report-routing.module';

import { ErrorReportPage } from './error-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorReportPageRoutingModule
  ],
  declarations: [ErrorReportPage]
})
export class ErrorReportPageModule {}
