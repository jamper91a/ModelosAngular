import {Component, Input, OnInit} from '@angular/core';
import {Hosts} from '../../../api/pojo/Hosts';
import {AllEmitersService} from '../../../services/emmiters/all-emiters.service';
import {HotsUpdatedDto} from '../../../services/emmiters/entities/hots-updated.dto';

@Component({
  selector: 'app-anfitrion-card',
  templateUrl: './hosts-card.component.html',
  styleUrls: ['./hosts-card.component.scss']
})
export class HostsCardComponent implements OnInit {

  @Input() host: Hosts
  constructor(
    private emitersService: AllEmitersService,
  ) { }

  ngOnInit(): void {
    const self = this;
    if (this.emitersService.subsHostUpdated === undefined) {
      this.emitersService.subsHostUpdated =
        this.emitersService.invokeHostUpdated.subscribe((data: HotsUpdatedDto) => {
          console.log('invoke');
          console.log(data);
          if(self.host.id == data.id)
            self.host.profile = data.host.profile
      });
    }
  }

}
