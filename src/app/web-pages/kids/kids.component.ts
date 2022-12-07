import {Component, ElementRef, OnInit} from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss']
})
export class KidsComponent implements OnInit {

  public url: string = environment.webPages.kids.get;
  public data: any[] = [];
  public imagePrefix: string = environment.imagePrefix;

  constructor(private requestService: RequestService,
              public el: ElementRef) { }

  ngOnInit(): void {
    this.getData(`${this.url}?facet=on&q=*:*&start=0&rows=12&fq=type:KidsClick`);
  }
  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item?.response?.docs;
      // this.allData = item;
    })
  }
}
