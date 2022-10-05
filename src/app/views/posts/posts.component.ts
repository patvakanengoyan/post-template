import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as customBuild from '../../shared/ckCustomBuild/build/ckeditor.js';
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment.prod";
import {editorConfig} from "../../shared/ckEditorConfig/ck-editor-config";
import {list} from "../../shared/countryList/countryList";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from '@angular/forms';
import {Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  url: any = `${environment.admin.posts}`;
  data: any;
  viewData: any;
  form: any = FormGroup;
  public Editor = customBuild;
  @Input() config = editorConfig;
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  countryList = list;
  isModalShown = false;
  requestType: any;
  itemListCountry: any = [];
  settingsCountry: any = {};
  itemListCity: any = [];
  itemListCategory: any = [];
  settingsCategory: any = {};

  itemListTag: any = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', {static: false}) fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete!: MatAutocomplete;


  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      tag: [[], Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      status: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.setCountyList()
    // this.getData();
    // this.itemListCountry = [
    //   {"id":1,"itemName":"USA"},
    //   {"id":2,"itemName":"England"},
    //   {"id":3,"itemName":"France"},
    // ];

    this.settingsCountry = {
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      singleSelection: true,
      text:"Select item"
    };
    // this.itemListCity = [
    //   {"id":1,"itemName":"New York",},
    //   {"id":2,"itemName":"Las Vegas"},
    //   {"id":3,"itemName":"London"},
    //   {"id":4,"itemName":"Paris"},
    // ];
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
    } else if (type === 'add') {

    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    this.form.reset();
    this.tagFiled.value = [];
  }

  get tagFiled() {
    return this.form.get('tag');
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.tagFiled.value.push(value.trim());
        this.tagFiled.updateValueAndValidity();

      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.tagFiled.value.indexOf(fruit);

    if (index >= 0) {
      this.tagFiled.value.splice(index, 1);
      this.tagFiled.updateValueAndValidity();

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);
    this.tagFiled.value.push(event.option.viewValue);
    this.tagFiled.updateValueAndValidity();
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(form: any){
    if (this.requestType == 'edit') {

    } else if (this.requestType == 'add') {
      // console.log(this.fruits);
      console.log(form);
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
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
  }

  setCountyList () {
    let countries = Object.keys(this.countryList);
    let list = countries.map((item, i) => {
      return {id: i + 1, itemName: item};
    });
    this.itemListCountry = [...list];
  }

  setCitiesList () {
    this.form.get('city').reset();
    let cities = this.form.value.country[0] ? this.countryList[this.form.value.country[0].itemName] : [];
    let list = cities.map((item, i) => {
      return {id: i + 1, itemName: item};
    });
    this.itemListCity = [...list];
  }

}
