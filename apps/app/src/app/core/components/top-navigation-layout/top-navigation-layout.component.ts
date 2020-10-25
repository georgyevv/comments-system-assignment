import { Component } from '@angular/core';

import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'csm-top-navigation-layout',
  templateUrl: './top-navigation-layout.component.html',
  styleUrls: ['./top-navigation-layout.component.scss']
})
export class TopNavigationLayoutComponent {
  constructor(private navigationService: NavigationService) {
  }

  public onAppLogoClick() {
    this.navigationService.navigate(['./']);
  }
}
