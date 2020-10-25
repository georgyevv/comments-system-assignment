import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TopNavigationLayoutComponent } from './core/components/top-navigation-layout/top-navigation-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: TopNavigationLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'comments',
        pathMatch: 'full',
      },
      {
        path: 'comments',
        loadChildren: () => import('./modules/comments/modules/comments-list/comments-list.module').then(m => m.CommentsListModule)
      },
      {
        path: 'page-not-found',
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
