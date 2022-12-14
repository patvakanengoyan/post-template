import {Component, Input, OnInit} from '@angular/core';
import { HeaderComponent } from '@coreui/angular';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {Router} from "@angular/router";
import {SocketConnectionService} from "../../../shared/service/socket-connection.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  constructor(public requestService: RequestService,
              private router: Router,
              private socketConnection: SocketConnectionService
              ) {
    super();
  }


  ngOnInit() {
    this.requestService.adminImage = localStorage.getItem('image');
    this.requestService.getData(`${environment.chat.gateway}`).subscribe((res) => {
    })
  }

  logout () {
    this.requestService.createData(`${environment.admin.logout}`, '').subscribe(() => {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('first_name');
      localStorage.removeItem('role');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token_type');
      localStorage.removeItem('birthday');
      localStorage.removeItem('last_name');
      localStorage.removeItem('role_name');
      localStorage.removeItem('email');
      localStorage.removeItem('image');
      localStorage.removeItem('status');
      this.router.navigateByUrl('admin/login');
    })
  }
}
