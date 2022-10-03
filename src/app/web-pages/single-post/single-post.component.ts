import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  url = environment.g.get;
  data: any = {};
  constructor(private requestService: RequestService,
              public activatedRoute: ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.getData(this.url);
  }

  getData (url: string) {
    this.requestService.getData(url + '/' + this.activatedRoute.snapshot.params['id']).subscribe((item: object) => {
      this.data = item;
    })
  }
}
