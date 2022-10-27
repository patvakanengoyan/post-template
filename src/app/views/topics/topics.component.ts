import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  url: any = `${environment.admin.topics.get}`;
  data: any;
  paginationConfig: any;
  viewData: any;
  form: any = FormGroup;
  itemId!: number;
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;
  itemList: any = [];
  selectedItems = [];
  settings: any = {};
  loading = false;
  indices: any;
  readonly bufferSize: number = 10;
  page: number = 1;
  isLoaded: boolean = true;
  mId: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder,) {
  }

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
      color: [''],
      image: ['', Validators.compose([
        Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
      ])],
    });
  }


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

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'] ? res['data'] : res;
      this.paginationConfig = res;
    })
  }


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


  showModal(item, type): void {
    this.isModalShown = true;
    this.requestType = type;
    this.itemId = item ? item.id : null;
    if (type === 'view') {
      this.viewData = item;
    } else if (type === 'edit') {
      this.getTopicKeysList(item, type)
    } else if (type === 'add') {
      // this.getTopicKeysList(item, type)
    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
    this.isModalShown = false;
    this.itemList = [];
    this.page = 1;
    this.isLoaded = true;
    this.form.reset();
  }

  onSubmit(form: any) {
    let data = {
      "color": form.color ? form.color : '#000000',
      "image": form.image,
      "main_key_guid": form.main_key[0].id,
      "key": {
        "en": form.key,
        "hy": form.key,
      }
    }

    if (this.requestType == 'edit') {
      this.requestService.updateData(this.url, data, this.itemId + '/update').subscribe((res) => {
        this.hideModal();
        this.getData(this.url);
      })
    } else if (this.requestType == 'add') {
      this.requestService.createData(this.url + '/' + 'create', data).subscribe((res) => {
        this.hideModal();
        this.getData(this.url);
      })
    }
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
    this.requestService.delete(this.url, id + '/delete').subscribe((res) => {
      this.getData(this.url);
      this.hideModal();
    })
  }
}
