import { CommentsListActions, CommentsListActionTypes } from './comments-list.actions';
import { CommentModel } from '../models/comment.model';
import { CommentTypeModel } from '../models/comment-type.model';

export interface CommentsListState {
  comment: CommentModel;
  commentIsSaving: boolean;
  commentError: string;

  list: CommentModel[];
  listIsLoading: boolean;
  listError: string;

  types: CommentTypeModel[];
  typesIsLoading: boolean;
  typesError: string;
}

const initialState: CommentsListState = {
  comment: null,
  commentIsSaving: null,
  commentError: null,

  list: null,
  listIsLoading: null,
  listError: null,

  types: null,
  typesIsLoading: null,
  typesError: null,
};

export function reducer(state: CommentsListState = initialState, action: CommentsListActions) {
  switch (action.type) {
    case CommentsListActionTypes.ClearComment: {
      return {
        ...state,
        comment: null,
        commentIsSaving: null,
        commentError: null,
      };
    }

    case CommentsListActionTypes.LoadComment: {
      return {
        ...state,
        comment: null,
        commentIsSaving: true,
        listError: null,
      };
    }
    case CommentsListActionTypes.LoadCommentSuccess: {
      return {
        ...state,
        comment: action.payload,
        commentIsSaving: false,
        commentError: null,
      };
    }
    case CommentsListActionTypes.LoadCommentFail: {
      return {
        ...state,
        comment: null,
        commentIsSaving: false,
        commentError: action.payload,
      };
    }

    case CommentsListActionTypes.LoadCommentsList: {
      return {
        ...state,
        listIsLoading: true,
        listError: null,
      };
    }
    case CommentsListActionTypes.LoadCommentsListSuccess: {
      return {
        ...state,
        list: action.payload,
        listIsLoading: false,
        listError: null,
      };
    }
    case CommentsListActionTypes.LoadCommentsListFail: {
      return {
        ...state,
        list: null,
        listIsLoading: false,
        listError: action.payload,
      };
    }

    case CommentsListActionTypes.CreateComment: {
      return {
        ...state,
        comment: action.payload,
        commentIsSaving: true,
        commentError: null,
      };
    }
    case CommentsListActionTypes.CreateCommentSuccess: {
      return {
        ...state,
        comment: null,
        commentIsSaving: false,
        commentError: null,
      };
    }
    case CommentsListActionTypes.CreateCommentFail: {
      return {
        ...state,
        commentIsSaving: false,
        commentError: action.payload,
      };
    }

    case CommentsListActionTypes.UpdateComment: {
      return {
        ...state,
        comment: action.payload,
        commentIsSaving: true,
        commentError: null,
      };
    }
    case CommentsListActionTypes.UpdateCommentSuccess: {
      return {
        ...state,
        commentIsSaving: false,
        commentError: null,
        list: null,
      };
    }
    case CommentsListActionTypes.UpdateCommentFail: {
      return {
        ...state,
        commentIsSaving: false,
        commentError: action.payload,
      };
    }

    case CommentsListActionTypes.DeleteComment: {
      return {
        ...state,
        commentIsSaving: true,
        commentError: null,
      };
    }
    case CommentsListActionTypes.DeleteCommentSuccess: {
      return {
        ...state,
        comment: null,
        commentIsSaving: false,
        commentError: null,
        list: null,
      };
    }
    case CommentsListActionTypes.DeleteCommentFail: {
      return {
        ...state,
        commentIsSaving: false,
        commentError: action.payload,
      };
    }

    case CommentsListActionTypes.LoadTypesList: {
      return {
        ...state,
        typesIsLoading: true,
        typesError: null,
      };
    }
    case CommentsListActionTypes.LoadTypesListSuccess: {
      return {
        ...state,
        types: action.payload,
        typesIsLoading: false,
        typesError: null,
      };
    }
    case CommentsListActionTypes.LoadTypesListFail: {
      return {
        ...state,
        types: null,
        typesIsLoading: false,
        typesError: action.payload,
      };
    }

    default:
      return state;
  }
}
