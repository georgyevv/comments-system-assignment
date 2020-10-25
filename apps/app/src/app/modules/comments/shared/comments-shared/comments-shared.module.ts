import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CommentsListEffects } from './state/comments-list.effects';
import { reducer } from './state/comments-list.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('comments-list', reducer),
    EffectsModule.forFeature([CommentsListEffects]),
  ]
})
export class CommentsSharedModule { }
