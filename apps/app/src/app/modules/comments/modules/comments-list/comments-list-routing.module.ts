import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsListRootComponent } from './comments-list-root.component';
import { CommentsListContainerComponent } from './containers/comments-list-container/comments-list-container.component';
import { CommentsListFormGuard } from './guards/comments-list-form.guard';

export const routes: Routes = [
  {
    path: '',
    component: CommentsListRootComponent,
    children: [
      {
        path: '',
        component: CommentsListContainerComponent,
        canDeactivate: [CommentsListFormGuard],
      },
      {
        path: 'view/:id',
        loadChildren: () => import('../comment-details/comment-details.module').then(m => m.CommentDetailsModule),
        data: { animation: 'CommentPage' },
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('../comment-form/comment-form.module').then(m => m.CommentFormModule),
        data: { animation: 'CommentPage' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsListRoutingModule {
}
