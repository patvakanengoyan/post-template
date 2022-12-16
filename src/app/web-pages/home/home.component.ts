import {Component, ElementRef, OnInit} from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment.prod";
import {OwlOptions} from "ngx-owl-carousel-o";

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
  public form: any;
  public urlSlider: string = environment.webPages.slider.get;
  public dataSlider: any[] = [];
  public customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    navText: ["<div><div class=\"custom-swiper-button-prev\"><span class=\"bi-chevron-left\"></span></div></div>",
      "<div><div class=\"custom-swiper-button-next\"><span class=\"bi-chevron-right\"></span></div></div>"],
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoHeight:true,
  }

  constructor(private requestService: RequestService,
              public el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.getDataKids(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:KidsClick`);
    this.getDataJune2020(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:June2020`);
    this.getDataAcademic(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:AcademicSearch`);
    this.getDataPieces(`${this.url}?facet=on&q=*:*&start=0&rows=8&fq=type:Pieces`);
    this.getDataSlider(this.urlSlider);

  }

  getDataSlider(url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataSlider = item;
    })
  }

  getDataKids(url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataKids = item?.response?.docs;
    })
  }

  getDataPieces(url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataPieces = item?.response?.docs;
    })
  }

  getDataJune2020(url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataJune2020 = item?.response?.docs;
    })
  }

  getDataAcademic(url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataAcademic = item?.response?.docs;
    })
  }
}
