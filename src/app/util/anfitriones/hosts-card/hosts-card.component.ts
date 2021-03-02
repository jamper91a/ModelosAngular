import {Component, Input, OnInit} from '@angular/core';
import {Hosts} from '../../../api/pojo/Hosts';

@Component({
  selector: 'app-anfitrion-card',
  templateUrl: './hosts-card.component.html',
  styleUrls: ['./hosts-card.component.scss']
})
export class HostsCardComponent implements OnInit {

  @Input() host: Hosts
  constructor() { }

  ngOnInit(): void {
  }

}
