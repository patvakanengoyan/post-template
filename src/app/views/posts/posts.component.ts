import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as customBuild from '../../../assets/ckeditor5-builder/build/ckeditor.js';
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment.prod";
import {editorConfig} from "../../shared/ckEditorConfig/ck-editor-config";
import {COMMA, ENTER, V} from "@angular/cdk/keycodes";
import {FormControl} from '@angular/forms';
import {Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    url: string = `${environment.admin.posts.get}`;
    data: any = [];
    viewData: any = {};
    form: any = FormGroup;
    public Editor = customBuild;
    @Input() config = editorConfig;
    @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
    @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
    isModalShown: boolean = false;
    requestType: string = '';
    monoSelect: any = {};
    multiSelect: any = {};

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    paginationConfig: any;
    tagCtrl = new FormControl();
    filteredtags: Observable<string[]>;
    // tags: string[] = ['Lemon'];
    alltags: string[] = ['Business', 'Culture', 'Sport', 'Food'];
    @ViewChild('tagInput', {static: false}) tagInput!: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutocomplete!: MatAutocomplete;
    editImagePath: any;
    taxonomyList: any = [];
    volumesList: any = [];
    topicList: any = [];
    type: any[] = [
        {id: 'KidsClick', itemName: 'KidsClick'},
        {id: 'AcademicSearch', itemName: 'AcademicSearch'},
        {id: 'Pieces', itemName: 'Pieces'},
        {id: 'June2020', itemName: 'June2020'},
    ];

    constructor(public requestService: RequestService,
                public fb: FormBuilder) {
        this.filteredtags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this._filter(tag) : this.alltags.slice())),
        );
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            taxonomies: [''],
            volume: [''],
            topics: [''],
            volume_number: ['', Validators.pattern(/^[0-9]*$/)],
            letter: ['', Validators.compose([Validators.maxLength(3), Validators.pattern(/^[a-zA-z]*$/)])],
            page: ['', Validators.pattern(/^[0-9]*$/)],
            slice_of_page: ['', Validators.compose([Validators.pattern(/^[0-9]*$/), Validators.minLength(2)])],
            color: [''],
            type: ['', Validators.required],
            image: [''],
            status: [''],
        })
    }

    /*
      The callback method that is called immediately after the page is called.
     */
    ngOnInit(): void {
        this.getData(this.url);
        this.getLists();
        this.monoSelect = {
            enableSearchFilter: true,
            addNewItemOnFilter: true,
            singleSelection: true,
            selectAllText: 'Select All',
            text: "Select item"
        };

        this.multiSelect = {
            enableSearchFilter: true,
            singleSelection: false,
            badgeShowLimit: 1,
            selectAllText: 'Select All',
            text: "Select item"
        };
    }

    /*
      Get all data method
     */
    getData(url) {
        this.requestService.getData(url).subscribe((res) => {
            this.data = res['data'] ? res['data'] : res;
            this.paginationConfig = res;
        })
    }

    /*
      Get data by id
     */
    getById(id) {
        this.requestService.getData(this.url + '/' + id).subscribe((res: any) => {
            this.viewData = res[0];
            if (this.requestType == 'edit') {
                let topics = [] as any;
                for (let i = 0; i < this.viewData.topics.length; i++) {
                    topics.push({
                        id: this.viewData.topics[i].guid,
                        itemName: this.viewData.topics[i].key
                    })
                }
                let taxonomies = [] as any;
                for (let i = 0; i < this.viewData.taxonomies.length; i++) {
                    let item = this.viewData.taxonomies;
                    taxonomies.push({
                        id: this.viewData.taxonomies[i].guid,
                        itemName: `Level 1 : ${item[i].level1}, Level 2 : ${item.level2}, Level 3 : ${item.level3}`
                    })
                }
                let volumes = [] as any;
                for (let i = 0; i < this.viewData.volumes.length; i++) {
                    volumes.push({
                        id: this.viewData.volumes[i].guid,
                        itemName: this.viewData.volumes[i].key
                    })
                }
                this.editImagePath = this.viewData.image.url;
                this.form.controls.image.clearValidators();
                this.form.controls.image.updateValueAndValidity();
                this.form.patchValue({
                    title: this.viewData.title,
                    description: this.viewData.description,
                    taxonomies: taxonomies,
                    volume: volumes,
                    topics: topics,
                    volume_number: this.viewData.volume_number,
                    letter: this.viewData.letter,
                    page: this.viewData.page,
                    slice_of_page: this.viewData.slice_of_page,
                    color: this.viewData.color,
                    type: [{id: this.viewData.type, itemName: this.viewData.type}],
                    status: this.viewData.status
                });
            }
        })
    }

    /*
      Method for open modal
     */
    showModal(id, type): void {
        this.isModalShown = true;
        this.requestType = type;
        if (type === 'view') {
            this.getById(id);
        } else if (type === 'edit') {
            this.getById(id);
        } else if (type === 'add') {
        }
    }

    /*
      Method for hide modal
     */
    hideModal(): void {
        this.autoShownModal?.hide();
        this.isModalShown = false;
        this.editImagePath = undefined;
        this.form.reset();
        // this.tagFiled.value = [];
    }

    /*
      Get form filed 'tag'
     */
    get tagFiled() {
        return this.form.get('tag');
    }

    /*
      Adds an element to the "tag" field
     */
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

    /*
      Removes the element in the "tag" field
     */
    remove(tag: string): void {
        const index = this.tagFiled.value.indexOf(tag);

        if (index >= 0) {
            this.tagFiled.value.splice(index, 1);
            this.tagFiled.updateValueAndValidity();

        }
    }

    /*
      Selected the element in the "tag" field
     */
    selected(event: MatAutocompleteSelectedEvent): void {
        this.tagFiled.value.push(event.option.viewValue);
        this.tagFiled.updateValueAndValidity();
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }

    /*
      Filter selected elements in the "tag" field
     */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    }

    /*
      Send data method
     */
    onSubmit(form: any) {
        let url = this.requestType == 'edit' ? this.url + '/' + this.viewData.id : this.url;
        let data = new FormData();
        if (this.form.value['topics']) {
          for (let i = 0; i < this.form.value['topics'].length; i++) {
            data.append(`topics[${[i]}]`, this.form.value['topics'][i].id);
          }
        }
        if (this.form.value['taxonomies']) {
          for (let i = 0; i < this.form.value['taxonomies'].length; i++) {
            data.append(`taxonomies[${[i]}]`, this.form.value['taxonomies'][i].id);
          }
        }
        if (this.form.value['image']) {
            data.append('image', form.image);
        }
        if (this.form.value['volume']) {
          data.append('volume', this.form.value['volume'][0].id);
        }
        data.append('volume_number', form.volume_number);
        data.append('letter', form.letter);
        data.append('page', form.page);
        data.append('slice_of_page', form.slice_of_page);
        data.append('color', form.color);
        data.append('type', form.type[0].id);
        data.append('translations[en][title]', form.title);
        data.append('translations[en][description]', form.description);
        data.append('status', form.status == true || form.status == '1' ? '1' : '0');
        if (this.requestType == 'edit') {
            data.append('_method', 'PUT');
        }
        this.requestService.createData(url, data).subscribe((res) => {
            this.getData(this.url);
            this.hideModal();
        });
    }

    /*
      Delete item from data
     */
    deleteItem(id) {
        this.modal.modalRef.hide();
        this.requestService.delete(this.url, id).subscribe((res) => {
            this.getData(this.url);
            this.hideModal();
        })
    }

    getLists() {
        let request1 = this.requestService.getData(`${environment.admin.posts.getTaxonomyList}`);
        let request2 = this.requestService.getData(`${environment.admin.posts.getTopicList}`);
        let request3 = this.requestService.getData(`${environment.admin.posts.getVolumesList}`);
        forkJoin([request1, request2, request3]).subscribe(([item1, item2, item3]: any) => {
            this.taxonomyList = [];
            for (let i = 0; i < item1.data.length; i++) {
                this.taxonomyList.push({
                    id: item1.data[i].guid,
                    itemName: `Level 1 : ${item1.data[i].level1}, Level 2 : ${item1.data[i].level2}, Level 3 : ${item1.data[i].level3}`
                });
            }
            this.topicList = [];
            for (let i = 0; i < item2.data.length; i++) {
                this.topicList.push({
                    id: item2.data[i].guid,
                    itemName: item2.data[i].key
                });
            }
            this.volumesList = [];
            for (let i = 0; i < item3.data.length; i++) {
                this.volumesList.push({
                    id: item3.data[i].guid,
                    itemName: item3.data[i].key
                });
            }
        })
    }

}
