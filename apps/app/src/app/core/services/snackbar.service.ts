import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  public showCreateSuccess(createdModelName: string): void {
    this.show(`Successfully created ${createdModelName}`);
  }

  public showUpdateSuccess(updatedModelName: string): void {
    this.show(`Successfully updated ${updatedModelName}`);
  }

  public showDeleteSuccess(deletedModelName: string): void {
    this.show(`Successfully deleted ${deletedModelName}`);
  }

  public show(message: string, position: MatSnackBarVerticalPosition = 'bottom', action = '✖') {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: position
    });
  }
}
