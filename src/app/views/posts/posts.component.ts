import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as customBuild from '../../../assets/ckeditor5-builder/build/ckeditor.js';
import { ModalDirective } from "ngx-bootstrap/modal";
import { DeleteModalComponent } from "../../shared/utils/delete-modal/delete-modal.component";
import { RequestService } from "../../shared/service/request.service";
import { environment } from "../../../environments/environment.prod";
import { editorConfig } from "../../shared/ckEditorConfig/ck-editor-config";
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from "@angular/material/autocomplete";
import { DomSanitizer } from "@angular/platform-browser";
import { SocketConnectionService } from '../../shared/service/socket-connection.service';
import {Posts} from "../../shared/models/posts";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() config = editorConfig;
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  @ViewChild('tagInput', { static: false }) tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;
  public url: string = `${environment.admin.posts.get}`;
  public data: Posts[] = [];
  public viewData: any = {};
  public form: any = FormGroup;
  public Editor = customBuild;
  public isModalShown: boolean = false;
  public requestType: string = '';
  public monoSelect: any = {};
  public multiSelect: any = {};

    visible: boolean = true;
    selectable: boolean = true;
    paginationConfig: any;
    tagCtrl = new FormControl();
    editImagePath: any;
    taxonomyList: any = [];
    volumesList: any = [];
    topicList: any = [];
    type: any[] = [
        { id: 'KidsClick', itemName: 'KidsClick' },
        { id: 'AcademicSearch', itemName: 'AcademicSearch' },
        { id: 'Pieces', itemName: 'Pieces' },
        { id: 'June2020', itemName: 'June2020' },
    ];
    desc: any;

    loading = false;
    isLoadedList = {
        volume: true,
        taxonomies: true,
        topics: true,
    };
    pages = {
        volume: 1,
        taxonomies: 1,
        topics: 1,
    };
    selectedVolumes: any[] = [];
    selectedTaxonomies: any[] = [];
    selectedTopics: any[] = [];
    public comments: Array<object> = [];
    replyID;
    replyUserName;
    disableSend = false;
    chatID;
    public formComments: FormGroup = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        message_content: new FormControl('', Validators.required)
    });

    constructor(public requestService: RequestService,
        public fb: FormBuilder,
        public socket: SocketConnectionService,
        public sanitizer: DomSanitizer) {
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
        this.socket.connect();
        // this.getLists();
        this.monoSelect = {
            enableSearchFilter: true,
            addNewItemOnFilter: true,
            singleSelection: true,
            selectAllText: 'Select All',
            text: "Select item",
            lazyLoading: true,
        };

        this.multiSelect = {
            enableSearchFilter: true,
            singleSelection: false,
            badgeShowLimit: 2,
            selectAllText: 'Select All',
            text: "Select item",
            lazyLoading: true,
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
            this.desc = this.sanitizer.bypassSecurityTrustHtml(this.viewData.description);

            if (this.requestType == 'edit') {
                let topics = [] as any;
                this.selectedTopics = [];
                for (let i = 0; i < this.viewData.topics.length; i++) {
                    this.selectedTopics.push(this.viewData.topics[i].guid);
                    topics.push({
                        id: this.viewData.topics[i].guid,
                        itemName: this.viewData.topics[i].key
                    })
                }
                this.topicList = [...topics];
                let taxonomies = [] as any;
                this.selectedTaxonomies = [];
                for (let i = 0; i < this.viewData.taxonomies.length; i++) {
                    this.selectedTaxonomies.push(this.viewData.taxonomies[i].guid);
                    taxonomies.push({
                        id: this.viewData.taxonomies[i].guid,
                        itemName: `Level 1 : ${this.viewData.taxonomies[i].level1}, Level 2 : ${this.viewData.taxonomies[i].level2}, Level 3 : ${this.viewData.taxonomies[i].level3}`
                    })
                }
                this.taxonomyList = [...taxonomies];
                let volumes = [] as any;
                this.selectedVolumes = [];
                for (let i = 0; i < this.viewData.volumes.length; i++) {
                    this.selectedVolumes.push(this.viewData.volumes[i].guid);
                    volumes.push({
                        id: this.viewData.volumes[i].guid,
                        itemName: this.viewData.volumes[i].key
                    })
                }
                this.volumesList = [...volumes];
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
                    type: [{ id: this.viewData.type, itemName: this.viewData.type }],
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
        } else if (type === 'comments') {
            this.socket.messagesList = [];
            this.chatID = id.chat_id;
            this.socket.join(id.chat_id);
            this.socket.getMessagesList(id.chat_id);
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
        this.isLoadedList = {
            volume: true,
            taxonomies: true,
            topics: true,
        };
        this.pages = {
            volume: 1,
            taxonomies: 1,
            topics: 1,
        };
        this.taxonomyList = [];
        this.volumesList = [];
        this.topicList = [];
        // this.tagFiled.value = [];
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
            if (this.form.value['volume'].length > 0) {
                data.append('volume', this.form.value['volume'][0].id);
            }
        }
        data.append('letter', form.letter ? form.letter : '');
        data.append('page', form.page ? form.page : '');
        data.append('slice_of_page', form.slice_of_page ? form.slice_of_page : '');
        data.append('volume_number', form.volume_number ? form.volume_number : '');
        data.append('color', form.color ? form.color : '');
        data.append('type', form.type[0].id);
        data.append('translations[en][title]', form.title);
        data.append('translations[en][description]', form.description);
        data.append('status', form.status == true || form.status == '1' ? '1' : '0');
        if (this.requestType == 'edit') {
            data.append('_method', 'PUT');
        }
        this.requestService.createData(url, data).subscribe((res) => {
            this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
            this.hideModal();
        });
    }

    /*
      Delete item from data
     */
    deleteItem(id) {
        this.modal.modalRef.hide();
        this.requestService.delete(this.url, id).subscribe((res) => {
            this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
            this.hideModal();
        })
    }

    /*
      Get volume list
     */
    getVolumeList(event: any, type) {
        if (event.endIndex === this.volumesList.length - 1 && this.isLoadedList[type]) {
            this.loading = true;
            this.isLoadedList[type] = false;
            this.requestService.getData(`${environment.admin.posts.getVolumesList}?page=${this.pages[type]}`).subscribe((res: any) => {
                if (!res['message']) {
                    let newData: any = [];
                    this.isLoadedList[type] = res.last_page !== this.pages[type];
                    for (let i in res['data']) {
                        if (!this.selectedVolumes.includes(res['data'][i]['guid'])) {
                            newData.push(
                                { "id": res['data'][i]['guid'], "itemName": res['data'][i]['key'] }
                            );
                        }
                    }
                    this.volumesList = [...this.volumesList.concat(newData)];
                    this.loading = false;
                    this.pages[type] += 1
                }
            });
        }
    }

    /*
      Get taxonomy list
     */
    getTaxonomiesList(event: any, type) {
        if (event.endIndex === this.taxonomyList.length - 1 && this.isLoadedList[type]) {
            this.loading = true;
            this.isLoadedList[type] = false;
            this.requestService.getData(`${environment.admin.posts.getTaxonomyList}?page=${this.pages[type]}`).subscribe((res: any) => {
                if (!res['message']) {
                    let newData: any = [];
                    this.isLoadedList[type] = res.last_page !== this.pages[type];
                    for (let i in res['data']) {
                        if (!this.selectedTaxonomies.includes(res['data'][i]['guid'])) {
                            newData.push(
                                { "id": res['data'][i]['guid'], "itemName": `Level 1 : ${res.data[i].level1}, Level 2 : ${res.data[i].level2}, Level 3 : ${res.data[i].level3}` }
                            );
                        }
                    }
                    this.taxonomyList = [...this.taxonomyList.concat(newData)];
                    this.loading = false;
                    this.pages[type] += 1
                }
            });
        }
    }

    /*
      Get topic list
     */
    getTopicList(event: any, type) {
        if (event.endIndex === this.topicList.length - 1 && this.isLoadedList[type]) {
            this.loading = true;
            this.isLoadedList[type] = false;
            this.requestService.getData(`${environment.admin.posts.getTopicList}?page=${this.pages[type]}`).subscribe((res: any) => {
                if (!res['message']) {
                    let newData: any = [];
                    this.isLoadedList[type] = res.last_page !== this.pages[type];
                    for (let i in res['data']) {
                        if (!this.selectedTopics.includes(res['data'][i]['guid'])) {
                            newData.push(
                                { "id": res['data'][i]['guid'], "itemName": res['data'][i]['key'] }
                            );
                        }
                    }
                    this.topicList = [...this.topicList.concat(newData)];
                    this.loading = false;
                    this.pages[type] += 1
                }
            });
        }
    }

    /*
      Send message
     */
    submit(val) {
        if (this.formComments.valid && localStorage.getItem('access_token')) {
            this.disableSend = true;
            let value = { ...val };
            value.message_type = 1;
            if (this.replyID) {
                value.message_reply_id = this.replyID;
            }
            let ex_version = 'v' + this.socket?.getInfo?.result?.endpoints?.major_version + '.' + this.socket?.getInfo?.result?.endpoints?.minor_version;
            this.requestService.createData(`${this.socket?.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/${this.chatID}/message/create`, value, true).subscribe(res => {
                this.formComments.controls['message_content'].setValue('');
                this.replyID = undefined;
                this.replyUserName = undefined;
                this.disableSend = false;
            })
        }
    }

    /*
      Reply message
     */
    replyComment(comment) {
        this.replyID = comment['message_id'];
        this.replyUserName = comment['message_author']['user_name'];
    }

    /*
      Clear reply
     */
    clearReply() {
        this.replyID = undefined;
        this.replyUserName = undefined;
    }

    /*
      Delete message
     */
    deleteMessage(com) {
        let ex_version = 'v' + this.socket?.getInfo?.result?.endpoints?.major_version + '.' + this.socket?.getInfo?.result?.endpoints?.minor_version;
        this.requestService.delete(`${this.socket?.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/${com.message_room_id}/message`, com.message_id, true).subscribe(res => {

        });
    }

}
