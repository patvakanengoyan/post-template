import {Component, ElementRef, OnInit} from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {FormBuilder} from "@angular/forms";
// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper';
import {environment} from "../../../environments/environment.prod";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public url: string = environment.posts.get;
    public imagePrefix: string = environment.imagePrefix;
    public data: any[] = [];
    public dataPieces: any[] = [];
    public dataAcademic: any[] = [];
    public dataKids: any[] = [];
    public dataJune2020: any[] = [];
    form: any;
    filterResult: any = {};
    allData: any;

    constructor(private requestService: RequestService,
                private fb: FormBuilder,
                public el: ElementRef
    ) {
    }

    ngOnInit(): void {
        this.getDataKids(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:KidsClick`);
        this.getDataJune2020(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:June2020`);
        this.getDataAcademic(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:AcademicSearch`);
        this.getDataPieces(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:Pieces`);
    }

    getDataKids(url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.dataKids = item?.response?.docs;
            // this.allData = item;
        })
    }

    getDataPieces(url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.dataPieces = item?.response?.docs;
            // this.allData = item;
        })
    }

    getDataJune2020(url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.dataJune2020 = item?.response?.docs;
            // this.allData = item;
        })
    }

    getDataAcademic(url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.dataAcademic = item?.response?.docs;
            // this.allData = item;
        })
    }

    searchResult(val: any) {
        if (val === 'reset') {
            this.getDataKids(this.url);
            return;
        }
        console.log(val)
        this.form = val;
        this.filterResult = {};
        this.form['value'] = val;
        for (let i in this.form.value) {
            if (this.form.value[i]) {
                this.isInclude(i)
            }
        }
        // this.data = Object.values(this.filterResult);
        this.el.nativeElement?.querySelector('#posts').scrollIntoView();
    }

    isInclude(key: string) {

    }
}
