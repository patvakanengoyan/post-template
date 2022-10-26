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
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData(`${this.url}?skip=0&limit=50`);
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'];
    })
  }

  getById(id) {
    this.requestService.getData(this.url + '/' + id ).subscribe((res) => {
      this.viewData = res;
      this.form.patchValue({
        first_name: res[0].first_name,
        last_name: res[0].last_name,
        email: res[0].email,
        role: res[0].role,
        status: res[0].status,
      })
    })
  }

  showModal(id, type): void {
    this.isModalShown = true;
    this.requestType = type
    this.itemId = id;
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
  }

  onSubmit(form: any){
    let url = this.url;
    let data = new FormData()
    if (this.requestType == 'edit') {
      url = `${this.url}/${this.itemId}`;
      data.append('_method', 'PUT');
    } else if (this.requestType == 'add') {
      this.requestService.createData(url, data).subscribe((res) => {
        this.hideModal();
        this.getData(this.url);
      })
    }
    console.log(form);
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
  }
}
