import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  onLogoutClicked() {
    this.authService.logout();
  }

  isUserLogged() {
    return this.authService.isLogged();
  }

}
