import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(public dialog: MatDialog, public overlay: Overlay) {
  }

  public show(width: string, data: any, dialogComponentType: ComponentType<any> | TemplateRef<any>): Observable<any> {
    const dialogRef = this.dialog.open(dialogComponentType, {
      width,
      data,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    return dialogRef.afterClosed();
  }
}
