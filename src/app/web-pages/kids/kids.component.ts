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

  constructor(private requestService: RequestService,
              public el: ElementRef) { }

  ngOnInit(): void {
    this.getData(this.url);
  }
  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item;
      // this.allData = item;
    })
  }
}
