import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromCommentsList from '../state/comments-list.state';
import * as commentsListActions from '../state/comments-list.actions';
import { CommentModel } from '../models/comment.model';
import { CommentTypeModel } from '../models/comment-type.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsListFacadeService {
  public comment$: Observable<CommentModel> = this.store.select(fromCommentsList.getComment);
  public commentIsSaving$: Observable<boolean> = this.store.select(fromCommentsList.getCommentIsSaving);
  public commentError$: Observable<string> = this.store.select(fromCommentsList.getCommentError);

  public commentsList$: Observable<CommentModel[]> = this.store.select(fromCommentsList.getCommentsList);
  public commentsListIsLoading$: Observable<boolean> = this.store.select(fromCommentsList.getCommentsListIsLoading);
  public commentsListError$: Observable<string> = this.store.select(fromCommentsList.getCommentsListError);

  public typesList$: Observable<CommentTypeModel[]> = this.store.select(fromCommentsList.getTypesList);
  public typesListIsLoading$: Observable<boolean> = this.store.select(fromCommentsList.getTypesListIsLoading);
  public typesListError$: Observable<string> = this.store.select(fromCommentsList.getTypesListError);

  constructor(private store: Store<fromCommentsList.State>) {
  }

  public clearComment(): void {
    this.store.dispatch(new commentsListActions.ClearComment());
  }

  public loadComment(id: number): void {
    this.store.dispatch(new commentsListActions.LoadComment(id));
  }

  public loadCommentsList(): void {
    this.store.dispatch(new commentsListActions.LoadCommentsList());
  }

  public createComment(comment: CommentModel): void {
    this.store.dispatch(new commentsListActions.CreateComment(comment));
  }

  public updateComment(comment: CommentModel): void {
    this.store.dispatch(new commentsListActions.UpdateComment(comment));
  }

  public deleteComment(id: number): void {
    this.store.dispatch(new commentsListActions.DeleteComment(id));
  }

  public loadTypesList(): void {
    this.store.dispatch(new commentsListActions.LoadTypesList());
  }
}
