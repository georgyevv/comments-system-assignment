import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommentFormComponent } from '../../components/comment-form/comment-form.component';
import { CommentTypeModel } from '../../../../shared/comments-shared/models/comment-type.model';
import { CommentModel } from '../../../../shared/comments-shared/models/comment.model';
import { CommentsListFacadeService } from '../../../../shared/comments-shared/services/comments-list-facade.service';
import { NavigationService } from '../../../../../../core/services/navigation.service';

@Component({
  selector: 'csm-comment-form-container',
  templateUrl: './comment-form-container.component.html',
  styleUrls: ['./comment-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormContainerComponent implements OnInit, OnDestroy {
  public id: number;
  public safeExit: boolean;

  public comment$: Observable<CommentModel> = this.commentsListFacade.comment$;
  public commentIsSaving$: Observable<boolean> = this.commentsListFacade.commentIsSaving$;
  public commentError$: Observable<string> = this.commentsListFacade.commentError$;

  public typesList$: Observable<CommentTypeModel[]> = this.commentsListFacade.typesList$;
  public typesListIsLoading$: Observable<boolean> = this.commentsListFacade.typesListIsLoading$;
  public typesListError$: Observable<string> = this.commentsListFacade.typesListError$;

  public showSpinner$: Observable<boolean> = combineLatest([
    this.commentIsSaving$,
    this.typesListIsLoading$
  ]).pipe(
    map(([commentIsSaving, typesListIsLoading]) => commentIsSaving || typesListIsLoading)
  );

  @ViewChild(CommentFormComponent) childForm: CommentFormComponent;

  constructor(
    private navigationService: NavigationService,
    private titleService: Title,
    private route: ActivatedRoute,
    private commentsListFacade: CommentsListFacadeService) {
  }

  public ngOnInit(): void {
    this.commentsListFacade.loadTypesList();

    this.route.params.subscribe((params: Params) => {
      const id = +params?.id;
      if (!id) {
        this.id = null;
        return;
      }

      this.titleService.setTitle('Edit Comment');
      this.id = id;
      this.commentsListFacade.loadComment(id);
    });
  }

  public ngOnDestroy(): void {
    this.commentsListFacade.clearComment();
  }

  public onCreateComment(form: CommentFormComponent): void {
    const isFormValid = form.validate();
    if (!isFormValid) {
      return;
    }

    this.safeExit = true;
    const formData = form.data;
    this.commentsListFacade.createComment(formData);
  }

  public onUpdateComment(form: CommentFormComponent): void {
    const isFormValid = form.validate();
    if (!isFormValid) {
      return;
    }

    this.safeExit = true;
    const formData = form.data;
    this.commentsListFacade.updateComment(formData);
  }

  public onCancel(): void {
    this.safeExit = true;
    this.navigationService.navigate(['./comments']);
  }
}
