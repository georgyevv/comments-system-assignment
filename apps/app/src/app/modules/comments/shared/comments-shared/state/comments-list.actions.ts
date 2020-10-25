import { Action } from '@ngrx/store';

import { CommentModel } from '../models/comment.model';
import { CommentTypeModel } from '../models/comment-type.model';

export enum CommentsListActionTypes {
  ClearComment = '[CommentsList Page] Clear Comment',

  LoadComment = '[CommentsList API] Load Comment',
  LoadCommentSuccess = '[CommentsList API] Load Comment Success',
  LoadCommentFail = '[CommentsList API] Load Comment Fail',

  LoadCommentsList = '[CommentsList API] Load Comments List',
  LoadCommentsListSuccess = '[CommentsList API] Load Comments List Success',
  LoadCommentsListFail = '[CommentsList API] Load Comments List Fail',

  CreateComment = '[CommentsList API] Create Comment',
  CreateCommentSuccess = '[CommentsList API] Create Comment Success',
  CreateCommentFail = '[CommentsList API] Create Comment Fail',

  UpdateComment = '[CommentsList API] Update Comment',
  UpdateCommentSuccess = '[CommentsList API] Update Comment Success',
  UpdateCommentFail = '[CommentsList API] Update Comment Fail',

  DeleteComment = '[CommentsList API] Delete Comment',
  DeleteCommentSuccess = '[CommentsList API] Delete Comment Success',
  DeleteCommentFail = '[CommentsList API] Delete Comment Fail',

  LoadTypesList = '[CommentsList API] Load Types List',
  LoadTypesListSuccess = '[CommentsList API] Load Types List Success',
  LoadTypesListFail = '[CommentsList API] Load Types List Fail',
}

export class ClearComment implements Action {
  public readonly type = CommentsListActionTypes.ClearComment;

  /**
   * @param payload Boolean that is used for effects if it should navigate to list
   */
  constructor(public payload?: boolean) { }
}

export class LoadComment implements Action {
  public readonly type = CommentsListActionTypes.LoadComment;

  constructor(public payload: number) { }
}
export class LoadCommentSuccess implements Action {
  public readonly type = CommentsListActionTypes.LoadCommentSuccess;

  constructor(public payload: CommentModel) { }
}
export class LoadCommentFail implements Action {
  public readonly type = CommentsListActionTypes.LoadCommentFail;

  constructor(public payload: string) { }
}

export class LoadCommentsList implements Action {
  public readonly type = CommentsListActionTypes.LoadCommentsList;
}
export class LoadCommentsListSuccess implements Action {
  public readonly type = CommentsListActionTypes.LoadCommentsListSuccess;

  constructor(public payload: CommentModel[]) { }
}
export class LoadCommentsListFail implements Action {
  public readonly type = CommentsListActionTypes.LoadCommentsListFail;

  constructor(public payload: string) { }
}

export class CreateComment implements Action {
  public readonly type = CommentsListActionTypes.CreateComment;

  constructor(public payload: CommentModel) { }
}
export class CreateCommentSuccess implements Action {
  public readonly type = CommentsListActionTypes.CreateCommentSuccess;

}
export class CreateCommentFail implements Action {
  public readonly type = CommentsListActionTypes.CreateCommentFail;

  constructor(public payload: string) { }
}

export class UpdateComment implements Action {
  public readonly type = CommentsListActionTypes.UpdateComment;

  constructor(public payload: CommentModel) { }
}
export class UpdateCommentSuccess implements Action {
  public readonly type = CommentsListActionTypes.UpdateCommentSuccess;

}
export class UpdateCommentFail implements Action {
  public readonly type = CommentsListActionTypes.UpdateCommentFail;

  constructor(public payload: string) { }
}

export class DeleteComment implements Action {
  public readonly type = CommentsListActionTypes.DeleteComment;

  constructor(public payload: number) { }
}
export class DeleteCommentSuccess implements Action {
  public readonly type = CommentsListActionTypes.DeleteCommentSuccess;

}
export class DeleteCommentFail implements Action {
  public readonly type = CommentsListActionTypes.DeleteCommentFail;

  constructor(public payload: string) { }
}

export class LoadTypesList implements Action {
  public readonly type = CommentsListActionTypes.LoadTypesList;
}
export class LoadTypesListSuccess implements Action {
  public readonly type = CommentsListActionTypes.LoadTypesListSuccess;

  constructor(public payload: CommentTypeModel[]) { }
}
export class LoadTypesListFail implements Action {
  public readonly type = CommentsListActionTypes.LoadTypesListFail;

  constructor(public payload: string) { }
}

export type CommentsListActions =
  | ClearComment

  | LoadComment
  | LoadCommentSuccess
  | LoadCommentFail

  | LoadCommentsList
  | LoadCommentsListSuccess
  | LoadCommentsListFail

  | CreateComment
  | CreateCommentSuccess
  | CreateCommentFail

  | UpdateComment
  | UpdateCommentSuccess
  | UpdateCommentFail

  | DeleteComment
  | DeleteCommentSuccess
  | DeleteCommentFail

  | LoadTypesList
  | LoadTypesListSuccess
  | LoadTypesListFail;
