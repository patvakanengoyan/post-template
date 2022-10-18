import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {RequestService} from "../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {

  public url: string = environment.posts.get;
  public data: any[] = [];

  constructor(private requestService: RequestService,
              public el: ElementRef) { }

  ngOnInit(): void {
  }
  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item;
      // this.allData = item;
    })
  }

}
