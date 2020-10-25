import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommentModel } from '../../../../shared/comments-shared/models/comment.model';
import { CommentTypeModel } from '../../../../shared/comments-shared/models/comment-type.model';

@Component({
  selector: 'csm-comments-list-item',
  templateUrl: './comments-list-item.component.html',
  styleUrls: ['./comments-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsListItemComponent {
  @Input() comment: CommentModel;
  @Input() types: CommentTypeModel[];

  public get typeName(): string {
    if (!this.types) {
      return '';
    }

    return this.types.find(t => t.id === this.comment.typeId)?.name;
  }
}
