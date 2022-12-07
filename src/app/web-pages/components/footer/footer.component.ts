import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../shared/service/request.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public url: string = environment.posts.get;
    public data: any[] = [];
    public imagePrefix: string = environment.imagePrefix;
  constructor(private requestService: RequestService,) { }

  ngOnInit(): void {
    this.getData(`${this.url}?facet=on&q=*:*&start=0&rows=4`)
  }
    getData(url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.setUrls(item?.response?.docs);
            // this.allData = item;
        })
    }

    setUrls (value) {
      this.data = value.map((item) => {
          if (item.type === 'KidsClick') {
              item.url = '/kids';
              return item;
          }
          if (item.type === 'AcademicSearch') {
              item.url = '/academic';
              return item;
          }
          if (item.type === 'Pieces') {
              item.url = '/pieces';
              return item;
          }
          if (item.type === 'June2020') {
              item.url = '/june2020';
              return item;
          }
      })
    }
}
