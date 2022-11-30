import {Component, ElementRef, OnInit} from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {FormBuilder} from "@angular/forms";
import {environment} from "../../../environments/environment";
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public url: string = environment.posts.get;
  public urlRabbiVersion: string = environment.webPages.rabbiVersion.get;
  public urlAcademic: string = environment.webPages.academic.get;
  public data: any[] = [];
  public dataRabbiVersion: any[] = [];
  public dataAcademic: any[] = [];
  form: any;
  filterResult: any = {};
  allData: any;
  constructor(private requestService: RequestService,
              private fb: FormBuilder,
              public el: ElementRef
              ) { }

  ngOnInit(): void {
    this.getData(this.url);
    this.getDataRabbiVersion(this.urlRabbiVersion);
    this.getDataAcademic(this.urlAcademic);
  }

  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item;
      // this.allData = item;
    })
  }

  getDataRabbiVersion (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataRabbiVersion = item;
      // this.allData = item;
    })
  }

  getDataAcademic (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.dataAcademic = item;
      // this.allData = item;
    })
  }

  searchResult (val: any) {
    if (val === 'reset') {
      this.getData(this.url);
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
    console.log(this.data)
  }

  isInclude (key: string) {
    this.data = this.allData.filter((item: any) => {
      if (item.title.toLowerCase().includes(this.form.title.toLowerCase()) || this.form.title == '') {
        return true;
      }
      return false;
    }).filter((item: any) => {
      if (item.description.toLowerCase().includes(this.form.description.toLowerCase())  || this.form.description == '') {
        return true;
      }
      return false;
    }).filter((item: any) => {
      if (item.country.toLowerCase().includes(this.form.country[0]?.itemName.toLowerCase())  || this.form.country == '' || !this.form.country.length) {
        return true;
      }
      return false;
    }).filter((item: any) => {
      if (item.city.toLowerCase().includes(this.form.city[0]?.itemName.toLowerCase())  || this.form.city == '' || !this.form.city.length) {
        return true;
      }
      return false;
    }).filter((item: any) => {
      if (this.form.category == '' || !this.form.category.length) {
        return true;
      } else if (this.form.category.length > 0) {
        for (let i = 0; i < this.form.category.length; i++) {
          if (item.categories.includes(this.form.category[i].itemName)) {
            return true;
          }
        }
      }
      return false;
    }).filter((item: any) => {
      if (this.form.tag == '' || !this.form.tag.length) {
        return true;
      } else if (this.form.tag.length > 0) {
        for (let i = 0; i < this.form.tag.length; i++) {
          if (item.tag.includes(this.form.tag[i].itemName)) {
            return true;
          }
        }
      }
      return false;
    })
  }
}
