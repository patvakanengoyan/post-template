import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../shared/service/request.service";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {environment} from "../../../environments/environment.prod";
import {Slider} from "../../shared/models/slider";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  public url: string = `${environment.admin.slider}`;
  public data: Slider[] = [];
  public viewData: any;
  public form: any = FormGroup;
  public isModalShown: boolean = false;
  public requestType: string = '';
  public editImagePath: string | undefined = '';
  public paginationConfig: any;

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
      description: ['', Validators.required],
      image: ['', Validators.required],
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
  getById(id) {
    this.requestService.getData(this.url + '/' + id).subscribe((res) => {
      this.viewData = res[0];
      if (this.requestType == 'edit') {
        this.editImagePath = this.viewData.image.url;
        this.form.controls.image.clearValidators();
        this.form.controls.image.updateValueAndValidity();
        this.form.patchValue({
          title: this.viewData.title,
          description: this.viewData.description,
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
    this.requestType = type
    if (type === 'view') {
      this.getById(id)
    } else if (type === 'edit') {
      this.getById(id)
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
  }

  /*
     Send data method
  */
  onSubmit(form: any) {
    let url = this.requestType == 'edit' ? this.url + '/' + this.viewData.id : this.url;
    let data = new FormData();
    if (this.form.value['image']) {
      data.append('image', form.image);
    }
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

}
