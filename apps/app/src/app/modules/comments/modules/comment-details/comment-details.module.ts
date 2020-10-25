import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CommentsSharedModule } from '../../shared/comments-shared/comments-shared.module';
import { CommentDetailsRootComponent } from './comment-details-root.component';
import { CommentDetailsRoutingModule } from './comment-details-routing.module';
import { CommentDetailsContainerComponent } from './containers/comment-details-container/comment-details-container.component';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { SpinnerModule } from '../../../../shared/spinner/spinner.module';
import { ConfirmationDialogModule } from '../../../../shared/confirmation-dialog/confirmation-dialog.module';

@NgModule({
  declarations: [CommentDetailsRootComponent, CommentDetailsContainerComponent, CommentDetailsComponent],
  imports: [
    CommonModule,
    CommentsSharedModule,
    CommentDetailsRoutingModule,
    MatCardModule,
    MatButtonModule,
    SpinnerModule,
    ConfirmationDialogModule,
  ]
})
export class CommentDetailsModule {
}
