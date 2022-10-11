import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  url: string = `${environment.admin.category}`;
  data: any = [];
  viewData: any = {};
  form: any = FormGroup;
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown: boolean = false;
  requestType: string = '';
  paginationConfig: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
  }

  /*
    The callback method that is called immediately after the page is called.
   */
  ngOnInit(): void {
    this.getData(this.url);
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: [''],
    })
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
  getById(url, id) {
    this.requestService.getData(url + '/' + id).subscribe((res) => {
      this.viewData = res[0];
      if (this.requestType == 'edit') {
        this.form.patchValue({
          title: this.viewData.title,
          status: this.viewData.status
        })
      }
    })
  }

  /*
    Method for open modal
   */
  showModal(id, type): void {
    this.isModalShown = true;
    this.requestType = type
    if (type === 'view') {
      this.getById(this.url, id)
    } else if (type === 'edit') {
      this.getById(this.url, id)
    } else if (type === 'add') {

    }
  }

  /*
    Method for hide modal
   */
  hideModal(): void {
    this.autoShownModal?.hide();
    this.isModalShown = false;
    this.form.reset();
  }

  /*
    Send data method
   */
  onSubmit(form: any) {
    let data = {
      "title": form.title,
      "translations": {
        "en": {"title": form.title},
        "hy": {"title": form.title}
      },
      "status": form.status == true || form.status == 1 ? 1 : 0
    }
    if (this.requestType == 'edit') {
      this.requestService.updateData(this.url, data, this.viewData.id).subscribe((res) => {
        this.getData(this.url);
        this.hideModal();
      })

    } else if (this.requestType == 'add') {
      this.requestService.createData(this.url, data).subscribe((res) => {
        this.getData(this.url);
        this.hideModal();
      })
    }
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
}
