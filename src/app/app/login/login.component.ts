import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: '../login/login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { }