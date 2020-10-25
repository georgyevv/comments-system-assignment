import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CommentModel } from '../../../../shared/comments-shared/models/comment.model';
import { CommentTypeModel } from '../../../../shared/comments-shared/models/comment-type.model';

@Component({
  selector: 'csm-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailsComponent {
  @Input() comment: CommentModel;
  @Input() types: CommentTypeModel[];

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() back = new EventEmitter<void>();

  public get typeName(): string {
    if (!this.types) {
      return '';
    }

    return this.types.find(t => t.id === this.comment.typeId)?.name;
  }

  public onDelete(): void {
    this.delete.emit(this.comment.id);
  }

  public onEdit(): void {
    this.edit.emit(this.comment.id);
  }

  public onBack(): void {
    this.back.emit();
  }
}
