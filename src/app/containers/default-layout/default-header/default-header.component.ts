import { Component, Input } from '@angular/core';
import { HeaderComponent } from '@coreui/angular';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  constructor(private requestService: RequestService,
              private router: Router,
              ) {
    super();
  }

  logout () {
    this.requestService.createData(`${environment.admin.logout}`, '').subscribe(() => {
      localStorage.clear();
      this.router.navigateByUrl('login');
    })
  }
}
