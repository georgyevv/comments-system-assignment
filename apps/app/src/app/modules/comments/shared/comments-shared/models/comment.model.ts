import { BasicUserModel } from '../../../../../core/models/basic-user.model';

export interface CommentModel {
  id: number;
  text: string;
  typeId: number;
  createdBy: BasicUserModel;
  createdOn: Date;
  modifiedBy: BasicUserModel;
  modifiedOn: Date;
}
