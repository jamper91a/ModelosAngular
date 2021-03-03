import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../api/service/users.service';
import {AuthUser} from '../../api/responses/LoginResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: AuthUser;
  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit(): void {
    //Check if user is logged in or not
    this.user = this.usersService.getUser();
  }


}
