import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestService} from "../../shared/service/request.service";
import {FormBuilder} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public url: string = environment.webPages.kids.get;
  public data: any[] = [];
  public imagePrefix: string = environment.imagePrefix;
  public form: any;
  public group = {};
  public searchResult: any = {
    main_topic_exact: [],
    taxanomy_lv1_exact: [],
    taxanomy_lv2_exact: [],
    taxanomy_lv3_exact: [],
    topics_exact: []
  };
  public rows: number = 12;
  public start: number = 0;
  public total: number = 0;
  public currentPage: number = 1;
  private filds: boolean = true;
  public collapsed = {
    main_topic_exact: false,
    taxanomy_lv1_exact: true,
    taxanomy_lv2_exact: true,
    taxanomy_lv3_exact: true,
    topics_exact: true
  };
  private isGetData: boolean = true;
  public type: string = '';
  public pageTitle: string = '';
  public redirectUrl: string = ''

  constructor(private requestService: RequestService,
              public fb: FormBuilder,
              public activatedRoute: ActivatedRoute,
              public el: ElementRef) { }

  ngOnInit(): void {
    switch (this.activatedRoute.snapshot.params['type']) {
      case 'kids' : this.type = 'KidsClick'; this.pageTitle = 'Kids'; break;
      case 'academic' : this.type = 'AcademicSearch'; this.pageTitle = 'Academic'; break;
      case 'pieces' : this.type = 'Pieces'; this.pageTitle = 'Pieces'; break;
      case 'june2020' : this.type = 'June2020'; this.pageTitle = 'June2020'; break;
    }
    this.redirectUrl = this.activatedRoute.snapshot.params['type'];
    if (this.isGetData) {
      this.getData(`${this.url}?facet=on&q=*:*&start=${this.start}&rows=${this.rows}&fq=type:${this.type}`);
    }
    this.form = this.fb.group({
      content: '',
    })

    this.requestService.search.subscribe((data) => {
      if (data) {
        this.isGetData = false;
        this.searchResult = data.filds;
        this.form.patchValue({content: data.form.content});
        this.call();
      }
    })
  }

  ngOnDestroy(): void {
    this.requestService.search = new BehaviorSubject(false);
  }

  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item?.response?.docs;
      this.total = item?.response?.numFound;
      if (this.filds) {
        this.filds = false;
        this.buildForm(item?.facet_counts.facet_fields)
      }
    })
  }

  buildForm (form) {
    this.group = {};
    for (let i in form) {
      if (form[i] instanceof Array) {
        let arr = [] as any;
        for (let j = 0; j < form[i].length; j+=2) {
          arr.push({name: `${form[i][j]} (${form[i][j + 1]})`, value: `${form[i][j]}`});
        }
        this.group[i] = arr;
      }
    }
    // console.log(a);
    // this.group['main_topic_exact'] = form.main_topic_exact.filter((item) => {
    //   if (typeof item == 'string') {
    //     return true;
    //   }
    //   return false;
    // }).map((item) => item);
    // this.group['taxanomy_lv1_exact'] = form.taxanomy_lv1_exact.filter((item) => {
    //   if (typeof item == 'string') {
    //     return true;
    //   }
    //   return false;
    // }).map((item) => item);
    // this.group['taxanomy_lv2_exact'] = form.taxanomy_lv2_exact.filter((item) => {
    //   if (typeof item == 'string') {
    //     return true;
    //   }
    //   return false;
    // }).map((item) => item);
    // this.group['taxanomy_lv3_exact'] = form.taxanomy_lv3_exact.filter((item) => {
    //   if (typeof item == 'string') {
    //     return true;
    //   }
    //   return false;
    // }).map((item) => item);
    // this.group['topics_exact'] = form.topics_exact.filter((item) => {
    //   if (typeof item == 'string') {
    //     return true;
    //   }
    //   return false;
    // }).map((item) => item);
  }
  search (key: string, value: string) {
    this.start = 0;
    if (this.searchResult[key].includes(value)) {
      this.searchResult[key].splice(this.searchResult[key].indexOf(value), 1)
    } else {
      this.searchResult[key].push(value)
    }
    this.call();
  }

  urlCounstract() {
    let urlArr = [] as any;
    this.currentPage = 1;
    for (let i in this.searchResult) {
      if (this.searchResult[i].length > 0) {
        let list = this.searchResult[i].map((item) => `"${item}"`);
        urlArr.push(`fq=${i}:(${list.join(' Or ')})`);
      }
    }
    return urlArr;
  }

  reset () {
    this.searchResult = {
      main_topic_exact: [],
      taxanomy_lv1_exact: [],
      taxanomy_lv2_exact: [],
      taxanomy_lv3_exact: [],
      topics_exact: []
    };
    this.start = 0;
    this.form.reset({content: ''});
    this.getData(`${this.url}?facet=on&q=*:*&start=${this.start}&rows=${this.rows}&fq=type:${this.type}`);
  }
  pageChanged (event) {
    this.currentPage = event.page;
    this.start = event.page * this.rows - this.rows;
    this.call();
  }

  call () {
    let urlArr = this.urlCounstract();
    let content = this.form.value.content ? this.form.value.content : '*:*';
    if (urlArr.length > 0) {
      this.getData(`${this.url}?facet=on&q=${content}&start=${this.start}&rows=${this.rows}&fq=type:${this.type}&${urlArr.join('&')}`)
    } else {
      this.getData(`${this.url}?facet=on&q=${content}&start=${this.start}&rows=${this.rows}&fq=type:${this.type}`)
    }
  }

  collaspseBlock (type: string) {
    this.collapsed[type] = !this.collapsed[type];
  }
  content (type?: string) {
    if (!type && this.form.value.content) {
      this.call();
    } else if (type) {
      this.form.reset({content: ''});
      this.call();
    }

    // clearTimeout(this.timeOut);
    // this.timeOut = setTimeout(() => {
    //   this.call();
    // }, 1000)
  }

}
