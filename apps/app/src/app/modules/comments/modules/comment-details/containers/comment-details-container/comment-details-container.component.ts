import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CommentModel } from '../../../../shared/comments-shared/models/comment.model';
import { CommentTypeModel } from '../../../../shared/comments-shared/models/comment-type.model';
import { CommentsListFacadeService } from '../../../../shared/comments-shared/services/comments-list-facade.service';
import { NavigationService } from '../../../../../../core/services/navigation.service';
import { ConfirmationDialogComponent } from '../../../../../../shared/confirmation-dialog/components/confirmation-dialog/confirmation-dialog.component';
import { PopupService } from '../../../../../../core/services/popup.service';

@Component({
  selector: 'csm-comment-details-container',
  templateUrl: './comment-details-container.component.html',
  styleUrls: ['./comment-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentDetailsContainerComponent implements OnInit, OnDestroy {
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

  constructor(
    private titleService: Title,
    private popupService: PopupService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private commentsListFacade: CommentsListFacadeService) {

    this.titleService.setTitle('Comments Details');
  }

  public ngOnInit(): void {
    this.commentsListFacade.loadTypesList();

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.commentsListFacade.loadComment(id);
    });
  }

  public ngOnDestroy(): void {
    this.commentsListFacade.clearComment();
  }

  public onEdit(id: number): void {
    this.navigationService.navigate([`./comments/edit/${id}`]);
  }

  public onDelete(id: number): void {
    const dialogReference = this.popupService.show(
      '450px',
      { text: 'Are you sure you want to delete this comment?' },
      ConfirmationDialogComponent
    );
    dialogReference.pipe(take(1)).subscribe(result => {
      if (result) {
        this.commentsListFacade.deleteComment(id);
      }
    });
  }

  public onBack(): void {
    this.navigationService.navigate(['./comments']);
  }
}
