import {Component, Input, OnInit} from '@angular/core';
import {AuthUser} from '../../../api/responses/LoginResponse';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  user: AuthUser
  constructor() { }

  ngOnInit(): void {
  }

}
