import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-volumes',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss']
})
export class VolumesComponent implements OnInit {

  url: any = `${environment.admin.volumes.get}`;
  data: any;
  paginationConfig: any;
  viewData: any;
  form: any = FormGroup;
  itemId!: number;
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
  }

  /*
    The callback method that is called immediately after the page is called.
   */
  ngOnInit(): void {
    this.getData(this.url);
    this.form = this.fb.group({
      key: ['', Validators.required],
      color: [''],
      image: ['', Validators.compose([Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)])],
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
    Method for open modal
   */
  showModal(item, type): void {
    this.isModalShown = true;
    this.requestType = type
    this.itemId = item ? item.id : null;
    if (type === 'view') {
      this.viewData = item;
    } else if (type === 'edit') {
      this.form.patchValue({
        key: item.key,
        color: item.color,
        image: item.image
      })
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
      "color": form.color ? form.color : '#000000',
      "image": form.image,
      "volume": {
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
      this.requestService.createData(`${this.url}/create`, data).subscribe((res) => {
        this.hideModal();
        this.getData(this.url);
      })
    }
  }

  /*
    Delete item from data
   */
  deleteItem(id) {
    this.requestService.delete(this.url, id + '/delete').subscribe((res) => {
      this.getData(this.url);
      this.modal.modalRef.hide();
    })
  }
}
