import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import { navItems } from './_nav';
import {BehaviorSubject, Subscription} from 'rxjs';
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit{
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  subscriptionLoading!: Subscription;
  loading: any = false;

  constructor(public requestService: RequestService,
              private cdRef: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.subscriptionLoading = this.requestService.loading.subscribe((data) => {
      if (data && data['isLoading'] && data['reqCount'] === 1) {
        this.loading = data['isLoading'];
        this.cdRef.detectChanges();
      }
      if (data && data['reqCount'] === 0) {
        this.loading = data['isLoading'];
        this.cdRef.detectChanges();
      }
    });
  }
}
