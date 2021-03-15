import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../../../../api/requests/users/LoginRequest';
import {UsersService} from '../../../../api/service/users.service';
import {LoginResponse} from '../../../../api/responses/LoginResponse';
import {Util} from '../../../../providers/util';

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
  ) { }

  ngOnInit(): void {
  }

  async onLogin() {
    this.request.email = this.loginForm.value.email;
    this.request.password = this.loginForm.value.password;
    try {
      let redirectUrl = '';
      const response: LoginResponse  = await this.userService.login(this.request);
      // if (response.usuario.group.id === 2) {
      //   await this.router.navigateByUrl('home');
      // } else{
      //   await this.util.showToast('Users no valid');
      // }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

}
