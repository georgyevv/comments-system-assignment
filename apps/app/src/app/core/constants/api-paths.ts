import { environment } from '../../../environments/environment';

export class ApiPaths {
  public static readonly domainURL: string = environment.apiUrl + '/api';

  // CommentsList
  private static readonly commentsListBaseUrl = ApiPaths.domainURL + '/comments';
  public static readonly commentsListGet = ApiPaths.commentsListBaseUrl;
  public static readonly commentsListCreate = ApiPaths.commentsListBaseUrl;
  public static readonly commentsTypesListGet = ApiPaths.domainURL + '/types';
  public static readonly commentsGetById = (id: number) => `${ApiPaths.commentsListBaseUrl}/${id}`;
  public static readonly commentsDeleteById = (id: number) => `${ApiPaths.commentsListBaseUrl}/${id}`;
  public static readonly commentsUpdate = ApiPaths.commentsListBaseUrl;
}
