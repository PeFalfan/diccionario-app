import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsListPage } from './lessons-list.page';

const routes: Routes = [
  {
    path: '',
    component: LessonsListPage
  },
  {
    path: 'lesson-detail',
    loadChildren: () => import('./lesson-detail/lesson-detail.module').then( m => m.LessonDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsListPageRoutingModule {}
