import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../../shared/service/request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  public url: string = environment.posts.get;
  @Output() close = new EventEmitter<string>();
  public form: any = FormGroup;
  public group = {};
  public collapsed = {
    main_topic_exact: true,
    taxanomy_lv1_exact: true,
    taxanomy_lv2_exact: true,
    taxanomy_lv3_exact: true,
    topics_exact: true
  };
  public searchResult = {
    main_topic_exact: [],
    taxanomy_lv1_exact: [],
    taxanomy_lv2_exact: [],
    taxanomy_lv3_exact: [],
    topics_exact: []
  };
  itemListType: any = [];
  singleSelectSetting: any = {};

  constructor(public requestService: RequestService,
              public fb: FormBuilder,
              public router: Router) {
  }

  ngOnInit(): void {
    this.getFilds(`${this.url}?facet=on&q=*:*&start=0&rows=0&fq=type:KidsClick`);
    this.form = this.fb.group({
      content: '',
      type: [[{id: 'KidsClick', itemName: 'KidsClick'}], Validators.required],
    });
    this.itemListType = [
      {id: 'KidsClick', itemName: 'KidsClick'},
      {id: 'AcademicSearch', itemName: 'AcademicSearch'},
      {id: 'Pieces', itemName: 'Pieces'},
      {id: 'June2020', itemName: 'June2020'},
    ];

    this.singleSelectSetting = {
      addNewItemOnFilter: true,
      singleSelection: true,
      text: "Select item",
      classes: 'my_class_type'
    };
  }

  getFilds(url) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.buildForm(item?.facet_counts.facet_fields);
    })
  }

  buildForm(form) {
    this.group['main_topic_exact'] = form.main_topic_exact.filter((item) => {
      if (typeof item == 'string') {
        return true;
      }
      return false;
    }).map((item) => item);
    this.group['taxanomy_lv1_exact'] = form.taxanomy_lv1_exact.filter((item) => {
      if (typeof item == 'string') {
        return true;
      }
      return false;
    }).map((item) => item);
    this.group['taxanomy_lv2_exact'] = form.taxanomy_lv2_exact.filter((item) => {
      if (typeof item == 'string') {
        return true;
      }
      return false;
    }).map((item) => item);
    this.group['taxanomy_lv3_exact'] = form.taxanomy_lv3_exact.filter((item) => {
      if (typeof item == 'string') {
        return true;
      }
      return false;
    }).map((item) => item);
    this.group['topics_exact'] = form.topics_exact.filter((item) => {
      if (typeof item == 'string') {
        return true;
      }
      return false;
    }).map((item) => item);
  }

  collaspseBlock(type: string) {
    this.collapsed[type] = !this.collapsed[type];
  }

  search(key: string, value: string) {
    if (this.searchResult[key].includes(value)) {
      this.searchResult[key].splice(this.searchResult[key].indexOf(value), 1)
    } else {
      this.searchResult[key].push(value)
    }
  }

  reset() {
    // this.form.reset({
    //   title: '',
    //   description: '',
    //   country: '',
    //   city: '',
    //   tag: '',
    //   category: ''
    // });
    // this.submit.emit('reset');
    // this.searchShow = !this.searchShow
  }

  searchSubmit(form: any) {
    if (this.form.valid) {
      let data = {
        form: this.form.value,
        filds: this.searchResult
      }
      if (this.form.value.type[0].id === 'KidsClick') {
        this.requestService.search.next(data);
        this.router.navigate(['/kids']);
      } else if (this.form.value.type[0].id === 'AcademicSearch') {
        this.requestService.search.next(data);
        this.router.navigate(['/academic']);
      } else if (this.form.value.type[0].id === 'Pieces') {
        this.requestService.search.next(data);
        this.router.navigate(['/pieces']);
      } else {
        this.requestService.search.next(data);
        this.router.navigate(['/june2020']);
      }
    }
  }

  closeForm() {
    this.close.emit('close');
  }
  onItemSelect (e) {
    this.getFilds(`${this.url}?facet=on&q=*:*&start=0&rows=0&fq=type:${this.form.value.type[0].id}`)
  }
}
