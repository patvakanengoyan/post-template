import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { RequestService } from './shared/service/request.service';
import { environment } from 'src/environments/environment.prod';
import { SocketConnectionService } from './shared/service/socket-connection.service';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private requestService: RequestService,
    private socket: SocketConnectionService
  ) {
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.getWay(environment.chat.gateway);
  }

  getWay(url) {
    this.requestService.getData(url).subscribe(res => {
      this.socket.getWayInfo.next(res);
    });

    this.socket.getWayInfo.subscribe(res => {
      if (res['data']) {
        this.socket.getInfofunc(res['data']);
      }
    })

  }

}
