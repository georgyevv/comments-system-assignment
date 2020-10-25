import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuillModule } from 'ngx-quill';

import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';

@NgModule({
  declarations: [
    RichTextEditorComponent
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    RichTextEditorComponent,
  ]
})
export class RichTextEditorModule { }
