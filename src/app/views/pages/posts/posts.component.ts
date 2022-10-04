import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as customBuild from '../../../shared/ckCustomBuild/build/ckeditor.js';
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../../shared/service/request.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  url: any = `${environment.admin.posts}`;
  data: any;
  viewData: any;
  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    tag: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    status: ['', Validators.required],
  })
  public Editor = customBuild;
  @Input() config = {

    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'alignment',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
        'mediaEmbed'
      ]
    },
    image: {
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '25%',
          value: '25'
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ]
    },
    mediaEmbed: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ],
      previewsInData: true
    },
    language: {
      ui: 'en',
      content: 'en',
      textPartLanguage: [
        { title: 'Arabic', languageCode: 'ar' },
        { title: 'English', languageCode: 'en' }
      ],
    },
  };
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;
  itemListCountry: any = [];
  settingsCountry: any = {};
  itemListCity: any = [];
  itemListCategory: any = [];
  settingsCategory: any = {};

  itemListTag: any = [];

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.itemListCountry = [
      {"id":1,"itemName":"USA"},
      {"id":2,"itemName":"England"},
      {"id":3,"itemName":"France"},
    ];

    this.settingsCountry = {
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      singleSelection: true,
      text:"Select item"
    };
    this.itemListCity = [
      {"id":1,"itemName":"New York",},
      {"id":2,"itemName":"Las Vegas"},
      {"id":3,"itemName":"London"},
      {"id":4,"itemName":"Paris"},
    ];
    this.itemListCategory = [
      {"id":1,"itemName":"Business"},
      {"id":2,"itemName":"Culture"},
      {"id":3,"itemName":"Sport"},
      {"id":4,"itemName":"Food"},
      {"id":5,"itemName":"Startups"},
      {"id":6,"itemName":"Travel"},
    ];

    this.settingsCategory = {
      enableSearchFilter: true,
      selectAllText: 'Select All',
      text:"Select item"
    };
    this.itemListTag = [
      {"id":1,"itemName":"Business"},
      {"id":2,"itemName":"Culture"},
      {"id":3,"itemName":"Sport"},
      {"id":4,"itemName":"Food"},
      {"id":5,"itemName":"Startups"},
    ];
  }

  getData() {
    this.requestService.getData(this.url).subscribe((res) => {
        this.data = res;
    })
  }

  getById(id) {
    this.requestService.getData(this.url + '/' + id ).subscribe((res) => {
      this.viewData = res;
    })
  }

  showModal(id, type): void {
    this.isModalShown = true;
    this.requestType = type
    if (type === 'view') {
        this.getById(id)
    } else if (type === 'edit') {
        this.getById(id)
    } else if (type === 'ad') {

    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  onSubmit(form: any){
    if (this.requestType == 'edit') {

    } else if (this.requestType == 'add') {
      let data = new FormData()
      // for (let key in form) {
      //   if (key == 'image') {
      //     if (this.file) {
      //       data.append(key, this.file);
      //     }
      //   }else if (key == 'categories') {
      //     for (let item in this.form.value['categories']) {
      //       data.append(`categories[${[item]}]`, this.form.value['categories'][item].id);
      //     }
      //   } else {
      //     data.append(key, this.form.value[key]);
      //   }
      // }
    }
    console.log(form);
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
  }

}
