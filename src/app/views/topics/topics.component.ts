import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";
import {Topics} from "../../shared/models/topics";

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
    @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
    @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
    public url: string = `${environment.admin.topics.get}`;
    public data: Topics[] = [];
    public paginationConfig: any;
    public viewData: any;
    public form: any = FormGroup;
    public itemId!: number | undefined;
    public isModalShown: boolean = false;
    public requestType: string = '';
    public itemList: any = [];
    public selectedItems = [];
    public settings: any = {};
    public loading: boolean = false;
    public indices: any;
    readonly bufferSize: number = 10;
    public page: number = 1;
    public isLoaded: boolean = true;
    public mId: any;

    constructor(public requestService: RequestService,
                public fb: FormBuilder,) {
    }

    /*
      The callback method that is called immediately after the page is called.
     */
    ngOnInit(): void {
        this.getData(`${this.url}`);
        this.selectedItems = [];
        this.settings = {
            text: "Select item",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            lazyLoading: true,
            singleSelection: true,
        };
        this.form = this.fb.group({
            key: ['', Validators.required],
            main_key: ['', Validators.required],
            color: ['', Validators.required],
            image: ['', Validators.compose([
                Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
            ])],
        });
    }


    /*
      Get topic keys data
     */
    fetchMore(event: any) {
        if (event.endIndex === this.itemList.length - 1 && this.isLoaded) {
            this.loading = true;
            this.isLoaded = false;
            this.requestService.getData(environment.admin.topic_keys.get + '?page=' + this.page).subscribe((res: any) => {
                if (!res['message']) {
                    let newData: any = [];
                    this.isLoaded = res.last_page !== this.page;
                    for (let i in res['data']) {
                        if (this.mId != res['data'][i]['guid']) {
                            newData.push(
                                {"id": res['data'][i]['guid'], "itemName": res['data'][i]['name']}
                            );
                        }
                    }
                    this.itemList = [...this.itemList.concat(newData)]
                    this.loading = false;
                    this.page += 1
                }
            });
        }
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
      Get topic key list
     */
    getTopicKeysList(item, type) {
        if (type == 'edit') {
            this.form.patchValue({
                key: item.key,
                main_key: [{"id": item.main_key_guid, "itemName": item.main_key}],
                color: item.color,
                image: item.image,
            })
        }
        this.mId = item.main_key_guid;
        this.itemList = [...[{"id": item.main_key_guid, "itemName": item.main_key}]]
    }

    /*
      Method for open modal
    */
    showModal(item, type): void {
        this.isModalShown = true;
        this.requestType = type;
        this.itemId = item ? item.id : null;
        if (type === 'view') {
            this.viewData = item;
        } else if (type === 'edit') {
            this.getTopicKeysList(item, type)
        }
    }

    /*
      Method for hide modal
    */
    hideModal(): void {
        this.autoShownModal?.hide();
        this.isModalShown = false;
        this.itemList = [];
        this.page = 1;
        this.isLoaded = true;
        this.form.reset();
    }

    /*
      Send data method
     */
    onSubmit(form: any) {
        let data = {
            "color": form.color,
            "image": form.image,
            "main_key_guid": form.main_key[0].id,
            "key": {
                "en": form.key,
            }
        }

        if (this.requestType == 'edit') {
            this.requestService.updateData(this.url, data, this.itemId + '/update').subscribe((res) => {
                this.hideModal();
                this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
            })
        } else if (this.requestType == 'add') {
            this.requestService.createData(`${this.url}/create`, data).subscribe((res) => {
                this.hideModal();
                this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
            })
        }
    }

    /*
      Delete item from data
    */
    deleteItem(id) {
        this.requestService.delete(this.url, id + '/delete').subscribe((res) => {
            this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
            this.modal.modalRef.hide();
        })
    }
}
