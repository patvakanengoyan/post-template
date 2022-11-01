import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-topic-keys',
  templateUrl: './topic-keys.component.html',
  styleUrls: ['./topic-keys.component.scss']
})
export class TopicKeysComponent implements OnInit {

  url: any = `${environment.admin.topic_keys.get}`;
  data: any;
  paginationConfig: any;
  viewData: any;
  form: any = FormGroup;
  itemId!: number;
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData(`${this.url}`);
    this.form = this.fb.group({
      name: ['', Validators.required],
      lang_code: [''],
      guid: [''],
    })
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'];
      this.paginationConfig = res;
    })
  }

  getById(id) {
    this.requestService.getData(this.url + '/' + id ).subscribe((res) => {
      this.viewData = res;
      this.form.patchValue({
        first_name: res[0].first_name,
        last_name: res[0].last_name,
        guid: res[0].guid
      })
    })
  }

  showModal(item, type): void {
    this.isModalShown = true;
    this.viewData = item;
    this.requestType = type
    this.itemId = item ? item.id : null;
    if (type === 'view') {
      // this.getById(item.id);
    } else if (type === 'edit') {
      this.form.patchValue({
        name: item.name,
        lang_code: item.lang_code,
        guid: item.guid
      })
      // this.getById(id);
    } else if (type === 'add') {

    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    this.form.reset();
  }

  onSubmit(form: any){
    if (this.requestType == 'edit') {
      this.requestService.updateData(`${this.url}/${this.itemId}`, form,'update').subscribe((res) => {
        this.hideModal();
        this.getData(this.url);
      })
    } else if (this.requestType == 'add') {
      let value = {
        lang_code: 'en',
        name: form.name
      }
      this.requestService.createData(`${this.url}/create`, value).subscribe((res) => {
        this.hideModal();
        this.getData(this.url);
      })
    }
    console.log(form);
  }

  deleteItem(id) {
    this.requestService.delete(this.url, id).subscribe((item) => {
      this.getData(this.url);
      this.modal.modalRef.hide();
    })
  }


}
