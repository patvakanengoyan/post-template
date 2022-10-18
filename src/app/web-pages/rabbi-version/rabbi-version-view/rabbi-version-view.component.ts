import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-rabbi-version-view',
  templateUrl: './rabbi-version-view.component.html',
  styleUrls: ['./rabbi-version-view.component.scss']
})
export class RabbiVersionViewComponent implements OnInit {

  public url: string = environment.posts.get;
  public data: any | object = {};
  constructor(private requestService: RequestService,
              public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getData(this.url);
  }
  getData (url: string) {
    this.requestService.getData(url + '/' + this.activatedRoute.snapshot.params['id']).subscribe((item: any) => {
      this.data = item;
    })
  }
}
