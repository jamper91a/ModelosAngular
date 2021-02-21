import {Component, Input, OnInit} from '@angular/core';
import {Anfitriones} from '../../../api/pojo/Anfitriones';

@Component({
  selector: 'app-anfitrion-card',
  templateUrl: './anfitrion-card.component.html',
  styleUrls: ['./anfitrion-card.component.scss']
})
export class AnfitrionCardComponent implements OnInit {

  @Input() anfitrion: Anfitriones
  constructor() { }

  ngOnInit(): void {
  }

}
