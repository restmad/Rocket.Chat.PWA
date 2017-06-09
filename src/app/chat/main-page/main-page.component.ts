import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PushNotificationsService } from '../../shared/services/push-notifications.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'chat',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements AfterViewInit {
  private readonly TIME_TO_REQUEST_PUSH = 5000;

  constructor(private menuCtrl: MenuController,
              private router: Router,
              private authenticationService: AuthenticationService,
              private pushService: PushNotificationsService) {
  }

  ngAfterViewInit(): void {
    Observable.fromEvent(window, 'resize').subscribe(() => this.modifySidenavToSize());

    setTimeout(() => this.pushService.initPushNotification(), this.TIME_TO_REQUEST_PUSH);
  }

  modifySidenavToSize() {
    if (window.outerWidth < 767) {
      this.menuCtrl.enable(true);
    }
    else {
      if (!this.menuCtrl.isOpen()) {
        this.menuCtrl.enable(true);
        this.menuCtrl.open();
      }

      if (this.menuCtrl.isEnabled()) {
        this.menuCtrl.enable(false);
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
