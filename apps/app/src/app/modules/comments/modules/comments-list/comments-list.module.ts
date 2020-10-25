import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Material imports
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
const materialImports = [
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
];

import { CommentsListContainerComponent } from './containers/comments-list-container/comments-list-container.component';
import { CommentsListRootComponent } from './comments-list-root.component';
import { CommentsListRoutingModule } from './comments-list-routing.module';
import { CommentFormModule } from '../comment-form/comment-form.module';
import { CommentsListItemComponent } from './components/comments-list-item/comments-list-item.component';
import { RichTextEditorModule } from '../../../../shared/rich-text-editor/rich-text-editor.module';
import { SpinnerModule } from '../../../../shared/spinner/spinner.module';
import { CommentsSharedModule } from '../../shared/comments-shared/comments-shared.module';
import { CommentsListFormGuard } from './guards/comments-list-form.guard';

@NgModule({
  declarations: [
    CommentsListContainerComponent,
    CommentsListRootComponent,
    CommentsListItemComponent
  ],
  providers: [
    CommentsListFormGuard
  ],
  imports: [
    CommonModule,
    CommentsListRoutingModule,
    ...materialImports,
    RichTextEditorModule,
    ReactiveFormsModule,
    CommentFormModule,
    SpinnerModule,
    CommentsSharedModule,
  ]
})
export class CommentsListModule { }
