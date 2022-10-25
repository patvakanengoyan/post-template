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
  imageValue: any;
  editImagePath: any;
  imagePath: any;
  image: any;
  file: any;

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
      status: [''],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    },{validator: this.matchingPasswords('password', 'password_confirmation')})
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
    form.status = form.status ? 1 : 0;
    let url = this.url;
    let data = new FormData()
    if (this.requestType == 'edit') {
      url = `${this.url}/${this.itemId}`;
      data.append('_method', 'PUT');
      for (let key in form) {
        if (key == 'image') {
          if (this.file) {
            data.append(key, this.file);
          }
        } else {
          data.append(key, this.form.value[key]);
        }
      }
    } else if (this.requestType == 'add') {
      for (let key in form) {
        if (key == 'image') {
          if (this.file) {
            data.append(key, this.file);
          }
        } else {
          data.append(key, this.form.value[key]);
        }
      }
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

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let password= group.controls[passwordKey];
      let passwordConfirmation= group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
    }
  }

  onChangeInput(e) {
    this.file = e.target ? e.target.files[0] : e;
    if (this.file) {
      const fileName = this.file.name;
      if (/\.(jpe?g|png|bmp)$/i.test(fileName)) {
        const filesize = this.file.size;
        if (filesize > 15728640) {
          this.form.controls.image.setErrors({size: 'error'});
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = () => {
            this.imageValue = reader.result;
          };
          this.image = this.file;
        }
      } else {
        this.form.controls.image.setErrors({type: 'error'});
      }
    } else {
      this.file = undefined;
      this.imageValue = undefined;
      this.form.controls.image.setErrors(null);
    }
  }

}
