import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentDetailsRootComponent } from './comment-details-root.component';
import { CommentDetailsContainerComponent } from './containers/comment-details-container/comment-details-container.component';

export const routes: Routes = [
  {
    path: '',
    component: CommentDetailsRootComponent,
    children: [
      {
        path: '',
        component: CommentDetailsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentDetailsRoutingModule { }
