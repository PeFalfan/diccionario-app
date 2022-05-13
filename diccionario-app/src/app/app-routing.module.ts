import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule )
  },
  {
    path: 'register-form',
    loadChildren: () => import('./pages/register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  {
    path: 'dictionary',
    loadChildren: () => import('./pages/dictionary/dictionary.module').then( m => m.DictionaryPageModule )
  },
  {
    path: 'lessons-list',
    loadChildren: () => import('./pages/lessons-list/lessons-list.module').then( m => m.LessonsListPageModule)
  },
  {
    path: 'lesson-detail',
    loadChildren: () => import('./pages/lessons-list/lesson-detail/lesson-detail.module').then( m => m.LessonDetailPageModule )
  },
  {
    path: 'document-load',
    loadChildren: () => import('./pages/document-load/document-load.module').then( m => m.DocumentLoadPageModule)
  },
  {
    path: 'document-download',
    loadChildren: () => import('./pages/document-download/document-download.module').then( m => m.DocumentDownloadPageModule )
  },
  {
    path: 'error-report',
    loadChildren: () => import('./pages/error-report/error-report.module').then( m => m.ErrorReportPageModule)
  },
  {
    path: 'new-word',
    loadChildren: () => import('./pages/new-word/new-word.module').then( m => m.NewWordPageModule )
  },
  {
    path: 'students-messages',
    loadChildren: () => import('./pages/students-messages/students-messages.module').then( m => m.StudentsMessagesPageModule)
  },  {
    path: 'students-list',
    loadChildren: () => import('./pages/students-list/students-list.module').then( m => m.StudentsListPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
