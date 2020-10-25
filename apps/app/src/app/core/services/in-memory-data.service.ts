import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { BasicUserModel } from '../models/basic-user.model';
import { CommentModel } from '../../modules/comments/shared/comments-shared/models/comment.model';
import { CommentTypeModel } from '../../modules/comments/shared/comments-shared/models/comment-type.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  public createDb(reqInfo?: RequestInfo): any {
    const comments = [
      {
        id: 1,
        text: '<b>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</b> Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        typeId: 2,
        createdBy: {
          id: 1,
          name: 'Yordan Georgiev',
        } as BasicUserModel,
        createdOn: new Date(),
        modifiedBy: {
          id: 1,
          name: 'Yordan Georgiev',
        } as BasicUserModel,
        modifiedOn: new Date(),
      } as CommentModel,
    ];

    const types = [
      {
        id: 1,
        name: 'Low'
      } as CommentTypeModel,
      {
        id: 2,
        name: 'Medium'
      } as CommentTypeModel,
      {
        id: 3,
        name: 'High'
      } as CommentTypeModel,
    ];

    return {
      comments: comments,
      types: types,
    };
  }

  // Overrides the genId method to ensure that an item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (11).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  public genId(items: any[]): number {
    return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 11;
  }
}
