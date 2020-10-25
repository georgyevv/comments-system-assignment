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

import { CommentFormContainerComponent } from './containers/comment-form-container/comment-form-container.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { RichTextEditorModule } from '../../../../shared/rich-text-editor/rich-text-editor.module';
import { SpinnerModule } from '../../../../shared/spinner/spinner.module';
import { CommentsSharedModule } from '../../shared/comments-shared/comments-shared.module';
import { CommentFormRootComponent } from './comment-form-root.component';
import { CommentFormRoutingModule } from './comment-form-routing.module';
import { CommentFormGuard } from './guards/comment-form.guard';

@NgModule({
  declarations: [
    CommentFormContainerComponent,
    CommentFormComponent,
    CommentFormRootComponent
  ],
  providers: [
    CommentFormGuard,
  ],
  imports: [
    CommonModule,
    RichTextEditorModule,
    ReactiveFormsModule,
    ...materialImports,
    SpinnerModule,
    CommentsSharedModule,
    CommentFormRoutingModule,
  ],
  exports: [
    CommentFormContainerComponent,
  ]
})
export class CommentFormModule { }
