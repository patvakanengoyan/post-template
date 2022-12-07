import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-june2020',
  templateUrl: './june2020.component.html',
  styleUrls: ['./june2020.component.scss']
})
export class June2020Component implements OnInit {

    public url: string = environment.webPages.june2020.get;
    public data: any[] = [];
    public imagePrefix: string = environment.imagePrefix;

    constructor(private requestService: RequestService,
                public el: ElementRef) { }

    ngOnInit(): void {
        this.getData(`${this.url}?facet=on&q=*:*&start=0&rows=12&fq=type:June2020`);
    }
    getData (url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.data = item?.response?.docs;
            // this.allData = item;
        })
    }

}
