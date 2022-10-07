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
  url: any = `${environment.admin.posts.get}`;
  data: any;
  viewData: any;
  form: any = FormGroup;
  public Editor = customBuild;
  @Input() config = editorConfig;
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  countryList = list;
  isModalShown = false;
  requestType: any;
  itemListCountry: any = [];
  settingsCountry: any = {};
  itemListCity: any = [];
  itemListCategory: any = [];
  settingsCategory: any = {};

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  paginationConfig: any;
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  // tags: string[] = ['Lemon'];
  alltags: string[] = ['Business', 'Culture', 'Sport', 'Food'];

  @ViewChild('tagInput', {static: false}) tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete!: MatAutocomplete;
  imageValue: any;
  editImagePath: any;
  imagePath: any;
  image: any;
  file: any;


  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.alltags.slice())),
    );
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      tag: [[]],
      categories: ['', Validators.required],
      image: ['', Validators.required],
      status: [''],
    })
  }

  ngOnInit(): void {
    this.setCountyList()
    this.getData(this.url);

    this.settingsCountry = {
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      singleSelection: true,
      text: "Select item"
    };

    this.settingsCategory = {
      enableSearchFilter: true,
      selectAllText: 'Select All',
      text: "Select item"
    };
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'] ? res['data'] : res;
      this.paginationConfig = res;
    })
  }

  getById(id) {
    this.requestService.getData(this.url + '/' + id).subscribe((res: any) => {
      this.viewData = res[0];
      if (this.requestType == 'edit') {
        let arr = [] as any;
        for (let i = 0; i < this.viewData.categories.length; i++) {
          arr.push({
            id: this.viewData.categories[i].id,
            itemName: this.viewData.categories[i].translation
          })
        }
        this.editImagePath = this.viewData.image.url;
        this.form.controls.image.clearValidators();
        this.form.controls.image.updateValueAndValidity();
        this.form.patchValue({
          title: this.viewData.title,
          description: this.viewData.description,
          categories: arr,
          country: [{id: Object.keys(this.countryList).indexOf(this.viewData.country) + 1, itemName: this.viewData.country}],
          city: [{id: this.countryList[this.viewData.country].indexOf(this.viewData.city), itemName: this.viewData.city}],
          status: this.viewData.status
        });
        this.setCitiesList(true)
      }
    })
  }

  getCategoryList () {
    this.requestService.getData(`${environment.admin.posts.getAllCategoryList}`).subscribe((res: any) => {
      if (!res['message']) {
        this.itemListCategory = [];
        for (let i in res) {
          this.itemListCategory.push(
            {"id": +i,"itemName":res[i]}
          );
        }

      }
    });
  }

  showModal(id, type): void {
    this.isModalShown = true;
    this.requestType = type
    if (type === 'view') {
      this.getById(id)
    } else if (type === 'edit') {
      this.getById(id)
      this.getCategoryList();
    } else if (type === 'add') {
      this.getCategoryList();
    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
    this.editImagePath = undefined;
    this.imageValue = undefined;
    this.file = undefined;
    this.form.reset();
    this.tagFiled.value = [];
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  get tagFiled() {
    return this.form.get('tag');
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tagFiled.value.push(value.trim());
        this.tagFiled.updateValueAndValidity();

      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tagFiled.value.indexOf(tag);

    if (index >= 0) {
      this.tagFiled.value.splice(index, 1);
      this.tagFiled.updateValueAndValidity();

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagFiled.value.push(event.option.viewValue);
    this.tagFiled.updateValueAndValidity();
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  onChangeInput(e) {
    this.file = e.target ? e.target.files[0] : e;
    if (this.file) {
      const fileName = this.file.name;
      if (/\.(jpe?g|png|bmp)$/i.test(fileName)) {
        const filesize = this.file.size;
        if (filesize > 15728640) {
          this.form.controls.image.setErrors({size: 'error'});
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = () => {
            this.imageValue = reader.result;
          };
          this.image = this.file;
        }
      } else {
        this.form.controls.image.setErrors({type: 'error'});
      }
    } else {
      this.file = undefined;
      this.imageValue = undefined;
      this.form.controls.image.setErrors(null);
    }
  }

  onSubmit(form: any) {
    let url = this.requestType == 'edit' ? this.url + '/' + this.viewData.id : this.url;

    let data = new FormData()
    for (let key in this.form.value) {
      if (key == 'image') {
        if (this.file) {
          data.append(key, this.file);
        }
      } else if (key == 'categories') {
        for (let item in this.form.value['categories']) {
          data.append(`categories[${[item]}]`, this.form.value['categories'][item].id);
        }
      } else {
        // data.append(key, this.form.value[key]);
      }
    }
    data.append('country', form.country[0].itemName)
    data.append('city', form.city[0].itemName)
    data.append('translations[en][title]', form.title)
    data.append('translations[hy][title]', form.title)
    data.append('translations[en][description]', form.description)
    data.append('translations[hy][description]', form.description)
    data.append('status', form.status == true || form.status == '1' ? '1' : '0');


    if (this.requestType == 'edit') {
      data.append('_method', 'PUT')
      this.requestService.createData(url, data).subscribe((res) => {
        this.getData(this.url);
        this.hideModal();
      })
    } else if (this.requestType == 'add') {
      this.requestService.createData(url, data).subscribe((res) => {
        this.getData(this.url);
        this.hideModal();
      })
    }
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
    this.requestService.delete(this.url, id).subscribe((res) => {
      this.getData(this.url);
      this.hideModal();
    })
  }

  setCountyList() {
    let countries = Object.keys(this.countryList);
    let list = countries.map((item, i) => {
      return {id: i + 1, itemName: item};
    });
    this.itemListCountry = [...list];
  }

  setCitiesList(set?) {
    set ? '' : this.form.get('city').reset();
    let cities = this.form.value.country[0] ? this.countryList[this.form.value.country[0].itemName] : [];
    let list = cities.map((item, i) => {
      return {id: i + 1, itemName: item};
    });
    this.itemListCity = [...list];
  }

}
