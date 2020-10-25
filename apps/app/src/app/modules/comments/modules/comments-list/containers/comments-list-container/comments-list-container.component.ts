import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommentModel } from '../../../../shared/comments-shared/models/comment.model';
import { CommentTypeModel } from '../../../../shared/comments-shared/models/comment-type.model';
import { CommentsListFacadeService } from '../../../../shared/comments-shared/services/comments-list-facade.service';
import { NavigationService } from '../../../../../../core/services/navigation.service';
import { CommentFormContainerComponent } from '../../../comment-form/containers/comment-form-container/comment-form-container.component';

@Component({
  selector: 'csm-comments-list-container',
  templateUrl: './comments-list-container.component.html',
  styleUrls: ['./comments-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsListContainerComponent implements OnInit {
  public commentsList$: Observable<CommentModel[]> = this.commentsListFacade.commentsList$;
  public commentsListIsLoading$: Observable<boolean> = this.commentsListFacade.commentsListIsLoading$;
  public commentsListError$: Observable<string> = this.commentsListFacade.commentsListError$;

  public typesList$: Observable<CommentTypeModel[]> = this.commentsListFacade.typesList$;
  public typesListIsLoading$: Observable<boolean> = this.commentsListFacade.typesListIsLoading$;
  public typesListError$: Observable<string> = this.commentsListFacade.typesListError$;

  public showSpinner$: Observable<boolean> = combineLatest([
    this.commentsListIsLoading$,
    this.typesListIsLoading$
  ]).pipe(
    map(([commentsListIsLoading, typesListIsLoading]) => commentsListIsLoading || typesListIsLoading)
  );

  @ViewChild(CommentFormContainerComponent) commentForm: CommentFormContainerComponent;

  constructor(
    private titleService: Title,
    private commentsListFacade: CommentsListFacadeService,
    private navigationService: NavigationService) {

    this.titleService.setTitle('Comments List');
  }

  public ngOnInit(): void {
    this.commentsListFacade.loadCommentsList();
    this.commentsListFacade.loadTypesList();
  }

  public onCommentClick(comment: CommentModel): void {
    this.navigationService.navigate(['./comments/view/' + comment.id]);
  }

  public trackByCommentId(index, comment): number {
    return comment.id;
  }
}
