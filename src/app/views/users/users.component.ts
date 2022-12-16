import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";
import {Users} from "../../shared/models/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  public url: string = `${environment.admin.users.get}`;
  public today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  public data: Users[] = [];
  public paginationConfig: any;
  public viewData!: Users;
  public form: any;
  private itemId!: number | undefined;
  public isModalShown: boolean = false;
  public requestType: string = '';
  // public editImagePath: string | undefined = '';

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData(this.url);
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      nickname: [''],
      birthday: ['', Validators.compose([Validators.required])],
      status: [''],
      password: ['', Validators.minLength(8)],
      password_confirmation: ['', Validators.minLength(8)],
    },{validator: this.matchingPasswords('password', 'password_confirmation')})
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'];
      this.paginationConfig = res;
    })
  }

  getById(id) {
    this.requestService.getData(this.url + '/' + id ).subscribe((res: any) => {
      this.viewData = res;
      // this.editImagePath = res[0]?.image?.url;
      this.form.patchValue({
        first_name: res[0].first_name,
        last_name: res[0].last_name,
        email: res[0].email,
        birthday: new Date(res[0].birthday).toISOString().split('T')[0] ,
        nickname: res[0].nickname,
        status: res[0].status,
      })
    })
  }

  showModal(id, type): void {
    this.isModalShown = true;
    this.requestType = type;
    this.itemId = id;
    if (type === 'view') {
      this.getById(id)
    } else if (type === 'edit') {
      this.getById(id);
        this.setValidation();
    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    // this.editImagePath = undefined;
    this.form.reset();
  }

  onSubmit(form: any){
    form.status = form.status ? 1 : 0;
    let url = this.url;
    let formValue = {
      ...form,
      birthday: new Date(this.form.value.birthday).toLocaleDateString().replace(/\./g, '/')
    }
    let data = new FormData();
      for (let key in formValue) {
        if (this.form.value[key]) {
            if (key == 'image' && formValue[key]) {
                data.append(key, formValue[key]);
            } else {
                data.append(key, formValue[key]);
            }
        }
      }
    if (this.requestType == 'edit') {
      url = `${this.url}/${this.itemId}`;
      data.append('_method', 'PUT');
    }
    this.requestService.createData(url, data).subscribe((res) => {
        this.hideModal();
        this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
    })
  }

  deleteItem(id) {
    this.requestService.delete(this.url, id).subscribe((item) => {
      this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      this.modal.modalRef.hide();
    })
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

  setValidation () {
    if (this.requestType == 'edit') {
      this.form.get('password_confirmation').clearValidators();
      this.form.get('password').clearValidators();
    } else {
        this.form.get('password_confirmation').setValidators([Validators.required]);
        this.form.get('password').setValidators([Validators.required]);
    }
      this.form.get('password_confirmation').updateValueAndValidity();
      this.form.get('password').updateValueAndValidity();
  }



}
