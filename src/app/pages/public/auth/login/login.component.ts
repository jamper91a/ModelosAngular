import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../../../../api/requests/users/LoginRequest';
import {UsersService} from '../../../../api/service/users.service';
import {LoginResponse} from '../../../../api/responses/LoginResponse';
import {Util} from '../../../../providers/util';
import {Router} from '@angular/router';
import {SocketsService} from '../../../../util/sockets/sockets-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('spectator1@email.com', [Validators.required, Validators.email]),
    password: new FormControl('12345', [Validators.required, Validators.minLength(5)]),
  });
  public request: LoginRequest = new LoginRequest();
  constructor(
    private userService: UsersService,
    private util: Util,
    private router: Router,
    private socketsService: SocketsService
  ) { }

  ngOnInit(): void {
  }

  async onLogin() {
    this.request.email = this.loginForm.value.email;
    this.request.password = this.loginForm.value.password;
    try {
      let redirectUrl = '';
      const response: LoginResponse  = await this.userService.login(this.request);
      //Connect to user socket
      this.socketsService.connectSocketUser();
      if (response.user.spectator) {
        await this.router.navigateByUrl('/');
      } else if (response.user.host) {
        await this.router.navigateByUrl('/hosts/edit');
      }
    } catch (e) {
      console.error(e);
    }
  }

}
