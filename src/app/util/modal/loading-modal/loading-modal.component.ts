import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string}) { }

  ngOnInit(): void {
  }

}
