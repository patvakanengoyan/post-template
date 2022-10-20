import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  url: any = `${environment.admin.users.get}`;
  data: any;
  paginationConfig: any;
  viewData: any;
  form: any = FormGroup;
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData(this.url);
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      image: ['', Validators.required],
      status: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    },{validator: this.matchingPasswords('password', 'password_confirmation')})
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
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

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let password= group.controls[passwordKey];
      let passwordConfirmation= group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
    }
  }

}
