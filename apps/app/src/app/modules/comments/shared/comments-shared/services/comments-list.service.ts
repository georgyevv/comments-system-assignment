import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClientService } from '../../../../../core/services/http-client.service';
import { CommentModel } from '../models/comment.model';
import { ApiPaths } from '../../../../../core/constants/api-paths';
import { GetCommentsResponseModel } from '../models/get-comments-response.model';
import { CommentTypeModel } from '../models/comment-type.model';
import { GetTypesResponseModel } from '../models/get-types-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsListService {
  constructor(private httpService: HttpClientService) {
  }

  public readById$(id: number): Observable<CommentModel> {
    const requestUrl = ApiPaths.commentsGetById(id);

    return this.httpService.get(requestUrl).pipe(
      map((response: GetCommentsResponseModel) => {
        const mappedItem = {
          ...response,
          createdOn: new Date(response.createdOn),
          modifiedOn: new Date(response.modifiedOn),
        };

        return mappedItem;
      })
    );
  }

  public readCommentsList$(): Observable<CommentModel[]> {
    const requestUrl = ApiPaths.commentsListGet;

    return this.httpService.get(requestUrl).pipe(
      map((response: GetCommentsResponseModel[]) => {
        const mappedItems = response.map(i => {
          return {
            ...i,
            createdOn: new Date(i.createdOn),
            modifiedOn: new Date(i.modifiedOn)
          };
        });

        return mappedItems;
      })
    );
  }

  public createComment$(comment: CommentModel): Observable<void> {
    const requestUrl = ApiPaths.commentsListCreate;
    const requestData: CommentModel = {
      ...comment,
      createdOn: new Date(),
      createdBy: {
        id: 1,
        name: 'Yordan Georgiev'
      },
      modifiedOn: new Date(),
      modifiedBy: {
        id: 1,
        name: 'Yordan Georgiev'
      }
    };

    return this.httpService.post(requestUrl, requestData);
  }

  public updateComment$(comment: CommentModel): Observable<void> {
    const requestUrl = ApiPaths.commentsUpdate;
    const requestData: CommentModel = {
      ...comment,
      modifiedOn: new Date(),
      modifiedBy: {
        id: 1,
        name: 'Yordan Georgiev'
      }
    };

    return this.httpService.put(requestUrl, requestData);
  }

  public deleteById$(id: number): Observable<void> {
    const requestUrl = ApiPaths.commentsDeleteById(id);

    return this.httpService.delete(requestUrl);
  }

  public readTypesList$(): Observable<CommentTypeModel[]> {
    const requestUrl = ApiPaths.commentsTypesListGet;

    return this.httpService.get(requestUrl).pipe(
      map((response: GetTypesResponseModel[]) => {
        const mappedItems = response;

        return mappedItems;
      })
    );
  }
}
