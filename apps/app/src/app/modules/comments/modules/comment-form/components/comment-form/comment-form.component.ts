import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { CommentTypeModel } from '../../../../shared/comments-shared/models/comment-type.model';
import { CommentModel } from '../../../../shared/comments-shared/models/comment.model';

@Component({
  selector: 'csm-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input() typesList: CommentTypeModel[];
  @Input() set comment(value: CommentModel) {
    this.commentValue = value;

    if (!value) {
      this.form.reset();
      this.hasValidationErrors$$.next(false);

      return;
    }

    this.form.patchValue({
      text: value?.text,
      typeId: value?.typeId,
    });
  }

  private hasValidationErrors$$ = new BehaviorSubject<boolean>(false);
  public hasValidationErrors$ = this.hasValidationErrors$$.asObservable();

  public form: FormGroup;

  public get data(): CommentModel {
    return {
      ...this.commentValue,
      ...this.form.value,
    };
  }

  private commentValue: CommentModel;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      text: [null, Validators.required],
      typeId: [null, Validators.required]
    });
  }

  public validate(): boolean {
    if (this.form.valid) {
      this.hasValidationErrors$$.next(false);
      return true;
    }

    this.form.markAllAsTouched();
    this.hasValidationErrors$$.next(true);

    return false;
  }
}
