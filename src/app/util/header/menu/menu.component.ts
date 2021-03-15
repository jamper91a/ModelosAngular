import {Component, Input, OnInit} from '@angular/core';
import {AuthUser} from '../../../api/responses/LoginResponse';
import {UsersService} from '../../../api/service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  user: AuthUser
  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async logOut(){
    await this.usersService.logOut();
    //Redirect
    await this.router.navigateByUrl('/');

  }

}
