import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-rabbi-version-view',
  templateUrl: './rabbi-version-view.component.html',
  styleUrls: ['./rabbi-version-view.component.scss']
})
export class RabbiVersionViewComponent implements OnInit {

  public url: string = environment.posts.get;
  public data: any | object = {};
  public form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required])],
    message: ['', Validators.required]
  })
  constructor(private requestService: RequestService,
              public activatedRoute: ActivatedRoute,
              public fb: FormBuilder) {}

  ngOnInit(): void {
    this.getData(this.url);
  }
  getData (url: string) {
    this.requestService.getData(url + '/' + this.activatedRoute.snapshot.params['id']).subscribe((item: any) => {
      this.data = item;
    })
  }

  sendComment() {

  }
}
