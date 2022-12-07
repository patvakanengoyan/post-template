import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {RequestService} from "../../shared/service/request.service";
@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {

    public url: string = environment.webPages.kids.get;
    public data: any[] = [];
    public imagePrefix: string = environment.imagePrefix;

    constructor(private requestService: RequestService,
                public el: ElementRef) { }

    ngOnInit(): void {
        this.getData(`${this.url}?facet=on&q=*:*&start=0&rows=12&fq=type:AcademicSearch`);
    }
    getData (url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.data = item?.response?.docs;
            // this.allData = item;
        })
    }

}
