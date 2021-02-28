import {Component, Input, OnInit} from '@angular/core';
import {Hosts} from '../../../api/pojo/Hosts';

@Component({
  selector: 'app-anfitrion-card',
  templateUrl: './anfitrion-card.component.html',
  styleUrls: ['./anfitrion-card.component.scss']
})
export class AnfitrionCardComponent implements OnInit {

  @Input() anfitrion: Hosts
  constructor() { }

  ngOnInit(): void {
  }

}
