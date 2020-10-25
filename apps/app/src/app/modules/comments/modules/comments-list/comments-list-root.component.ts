import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../../../core/animations/animations';

@Component({
  selector: 'csm-list-root',
  templateUrl: './comments-list-root.component.html',
  styleUrls: ['./comments-list-root.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class CommentsListRootComponent {
  public prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
