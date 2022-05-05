import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsMessagesPage } from './students-messages.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsMessagesPageRoutingModule {}
