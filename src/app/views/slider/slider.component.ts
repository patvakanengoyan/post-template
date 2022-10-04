import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../shared/service/request.service";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  url: any = `${environment.admin.slider}`;
  data: any;
  viewData: any;
  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    uri: ['', Validators.required],
    image: ['', Validators.required],
    status: ['', Validators.required],
  })
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.requestService.getData(this.url).subscribe((res) => {
      this.data = res;
    })
  }

  getById(id) {
    this.requestService.getData(this.url + '/' + id ).subscribe((res) => {
      this.viewData = res;
    })
  }

  showModal(id, type): void {
    this.isModalShown = true;
    this.requestType = type
    if (type === 'view') {
      this.getById(id)
    } else if (type === 'edit') {
      this.getById(id)
    } else if (type === 'ad') {

    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  onSubmit(form: any){
    if (this.requestType == 'edit') {

    } else if (this.requestType == 'add') {
      let data = new FormData()
      // for (let key in form) {
      //   if (key == 'image') {
      //     if (this.file) {
      //       data.append(key, this.file);
      //     }
      //   }else if (key == 'categories') {
      //     for (let item in this.form.value['categories']) {
      //       data.append(`categories[${[item]}]`, this.form.value['categories'][item].id);
      //     }
      //   } else {
      //     data.append(key, this.form.value[key]);
      //   }
      // }
    }
    console.log(form);
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
  }

}
