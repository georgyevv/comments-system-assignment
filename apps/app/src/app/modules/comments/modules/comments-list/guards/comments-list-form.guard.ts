import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { PopupService } from '../../../../../core/services/popup.service';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/components/confirmation-dialog/confirmation-dialog.component';
import { CommentsListContainerComponent } from '../containers/comments-list-container/comments-list-container.component';

@Injectable()
export class CommentsListFormGuard implements CanDeactivate<CommentsListContainerComponent> {
  constructor(private popupService: PopupService) { }

  public canDeactivate(
    component: CommentsListContainerComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (component?.commentForm?.childForm?.form?.dirty && !component?.commentForm?.safeExit) {
      const dialogReference = this.popupService.show(
        '450px',
        { text: 'Are you sure you want to continue without saving your changes?' },
        ConfirmationDialogComponent
      );
      return dialogReference.pipe(take(1));
    }

    return of(true);
  }
}
