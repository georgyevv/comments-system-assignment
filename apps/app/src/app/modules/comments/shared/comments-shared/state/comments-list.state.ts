import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../../core/state/app.state';
import * as fromCommentsList from './comments-list.reducer';

export interface State extends fromRoot.State {
  commentsList: fromCommentsList.CommentsListState;
}

const getCommentsListFeatureState = createFeatureSelector<fromCommentsList.CommentsListState>('comments-list');

export const getComment = createSelector(
  getCommentsListFeatureState,
  state => state.comment
);
export const getCommentIsSaving = createSelector(
  getCommentsListFeatureState,
  state => state.commentIsSaving
);
export const getCommentError = createSelector(
  getCommentsListFeatureState,
  state => state.commentError
);

export const getCommentsList = createSelector(
  getCommentsListFeatureState,
  state => state.list
);
export const getCommentsListIsLoading = createSelector(
  getCommentsListFeatureState,
  state => state.listIsLoading
);
export const getCommentsListError = createSelector(
  getCommentsListFeatureState,
  state => state.listError
);

export const getTypesList = createSelector(
  getCommentsListFeatureState,
  state => state.types
);
export const getTypesListIsLoading = createSelector(
  getCommentsListFeatureState,
  state => state.typesIsLoading
);
export const getTypesListError = createSelector(
  getCommentsListFeatureState,
  state => state.typesError
);
