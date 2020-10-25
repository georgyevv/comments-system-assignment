import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromCommentsList from './comments-list.state';
import * as commentsListActions from './comments-list.actions';
import { CommentsListService } from '../services/comments-list.service';
import { CommentModel } from '../models/comment.model';
import { CommentTypeModel } from '../models/comment-type.model';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { SnackbarService } from '../../../../../core/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsListEffects {
  constructor(
    private store: Store<fromCommentsList.State>,
    private commentsListService: CommentsListService,
    private navigationService: NavigationService,
    private snackbarService: SnackbarService,
    private actions$: Actions) {
  }

  @Effect({ dispatch: false })
  public clearComment: Observable<boolean> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.ClearComment),
    map((action: commentsListActions.ClearComment) => action.payload),
    tap((navigateToList: boolean) => {
      if (navigateToList) {
        this.navigationService.navigate(['./comments']);
      }
    })
  );

  @Effect()
  public loadComment: Observable<Action> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.LoadComment),
    map((action: commentsListActions.LoadComment) => action.payload),
    switchMap((id: number) => {
      try {
        return this.commentsListService.readById$(id).pipe(
          map((comment: CommentModel) => {
            return new commentsListActions.LoadCommentSuccess(comment);
          }),
          catchError((error: any) => of(new commentsListActions.LoadCommentFail(error)))
        );
      } catch (error) {
        return of(new commentsListActions.LoadCommentFail(error));
      }
    })
  );

  @Effect()
  public loadCommentsList: Observable<Action> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.LoadCommentsList),
    switchMap(() => {
      try {
        return this.commentsListService.readCommentsList$().pipe(
          map((comments: CommentModel[]) => {
            const sorted = comments.sort((a, b) => {
              return b.createdOn.getTime() - a.createdOn.getTime();
            });

            return new commentsListActions.LoadCommentsListSuccess(sorted);
          }),
          catchError((error: any) => of(new commentsListActions.LoadCommentsListFail(error)))
        );
      } catch (error) {
        return of(new commentsListActions.LoadCommentsListFail(error));
      }
    })
  );

  @Effect()
  public createComment: Observable<Action> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.CreateComment),
    map((action: commentsListActions.CreateComment) => action.payload),
    switchMap((comment: CommentModel) => {
      try {
        return this.commentsListService.createComment$(comment).pipe(
          map(() => new commentsListActions.CreateCommentSuccess()),
          tap(() => {
            this.snackbarService.showCreateSuccess('Comment');
            this.store.dispatch(new commentsListActions.LoadCommentsList());
          }),
          catchError((error: any) => of(new commentsListActions.CreateCommentFail(error)))
        );
      } catch (error) {
        return of(new commentsListActions.CreateCommentFail(error));
      }
    })
  );

  @Effect()
  public updateComment: Observable<Action> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.UpdateComment),
    map((action: commentsListActions.UpdateComment) => action.payload),
    switchMap((comment: CommentModel) => {
      try {
        return this.commentsListService.updateComment$(comment).pipe(
          map(() => new commentsListActions.UpdateCommentSuccess()),
          tap(() => {
            this.snackbarService.showUpdateSuccess('Comment');
            this.store.dispatch(new commentsListActions.ClearComment(true));
            this.store.dispatch(new commentsListActions.LoadCommentsList());
          }),
          catchError((error: any) => of(new commentsListActions.UpdateCommentFail(error)))
        );
      } catch (error) {
        return of(new commentsListActions.UpdateCommentFail(error));
      }
    })
  );

  @Effect()
  public deleteComment: Observable<Action> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.DeleteComment),
    map((action: commentsListActions.DeleteComment) => action.payload),
    switchMap((id: number) => {
      try {
        return this.commentsListService.deleteById$(id).pipe(
          map(() => new commentsListActions.DeleteCommentSuccess()),
          tap(() => {
            this.snackbarService.showDeleteSuccess('Comment');
            this.store.dispatch(new commentsListActions.ClearComment(true));
            this.store.dispatch(new commentsListActions.LoadCommentsList());
          }),
          catchError((error: any) => of(new commentsListActions.DeleteCommentFail(error)))
        );
      } catch (error) {
        return of(new commentsListActions.DeleteCommentFail(error));
      }
    })
  );

  @Effect()
  public loadTypesList$: Observable<Action> = this.actions$.pipe(
    ofType(commentsListActions.CommentsListActionTypes.LoadTypesList),
    map((action: commentsListActions.LoadTypesList) => action),
    withLatestFrom(this.store.select(fromCommentsList.getTypesList)),
    switchMap(([_, typesList]) => {
      try {
        if (typesList) {
          return of(new commentsListActions.LoadTypesListSuccess(typesList));
        }

        return this.commentsListService.readTypesList$().pipe(
          map((types: CommentTypeModel[]) => new commentsListActions.LoadTypesListSuccess(types)),
          catchError((error: any) => of(new commentsListActions.LoadTypesListFail(error)))
        );
      } catch (error) {
        return of(new commentsListActions.LoadCommentsListFail(error));
      }
    })
  );
}
