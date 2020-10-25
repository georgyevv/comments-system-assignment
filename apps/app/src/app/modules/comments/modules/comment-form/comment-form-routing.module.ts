import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentFormRootComponent } from './comment-form-root.component';
import { CommentFormContainerComponent } from './containers/comment-form-container/comment-form-container.component';
import { CommentFormGuard } from './guards/comment-form.guard';

export const routes: Routes = [
  {
    path: '',
    component: CommentFormRootComponent,
    children: [
      {
        path: '',
        component: CommentFormContainerComponent,
        canDeactivate: [CommentFormGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentFormRoutingModule { }
