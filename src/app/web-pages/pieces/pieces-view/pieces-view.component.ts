import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pieces-view',
  templateUrl: './pieces-view.component.html',
  styleUrls: ['./pieces-view.component.scss']
})
export class PiecesViewComponent implements OnInit {

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