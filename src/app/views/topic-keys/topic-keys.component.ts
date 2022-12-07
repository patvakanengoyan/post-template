import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";
import {TopicKeys} from "../../shared/models/topic-keys";

@Component({
  selector: 'app-topic-keys',
  templateUrl: './topic-keys.component.html',
  styleUrls: ['./topic-keys.component.scss']
})
export class TopicKeysComponent implements OnInit {

  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  public url: string = `${environment.admin.topic_keys.get}`;
  public data: TopicKeys[] = [];
  public paginationConfig: any;
  public viewData: any;
  public form: any = FormGroup;
  public itemId!: number;
  public isModalShown: boolean = false;
  public requestType: string = '';

  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
  }

  /*
    The callback method that is called immediately after the page is called.
   */
  ngOnInit(): void {
    this.getData(`${this.url}`);
    this.form = this.fb.group({
      name: ['', Validators.required],
      lang_code: [''],
      guid: [''],
    })
  }

  /*
    Get all data method
   */
  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'];
      this.paginationConfig = res;
    })
  }

  /*
    Method for open modal
  */
  showModal(item, type): void {
    this.isModalShown = true;
    this.viewData = item;
    this.requestType = type
    this.itemId = item ? item.id : null;
    if (type === 'view') {
    } else if (type === 'edit') {
      this.form.patchValue({
        name: item.name,
        lang_code: item.lang_code,
        guid: item.guid
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
    if (this.requestType == 'edit') {
      this.requestService.updateData(`${this.url}/${this.itemId}`, form, 'update').subscribe((res) => {
        this.hideModal();
        this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      })
    } else if (this.requestType == 'add') {
      let value = {
        lang_code: 'en',
        name: form.name
      };
      this.requestService.createData(`${this.url}/create`, value).subscribe((res) => {
        this.hideModal();
        this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      })
    }
  }

  /*
   Delete item from data
  */
  deleteItem(id: number): void {
    this.requestService.delete(this.url, id + '/delete').subscribe((item) => {
      this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      this.modal.modalRef.hide();
    })
  }

  hasError (control: AbstractControl): boolean {
    if (control?.invalid && (control?.dirty || control?.touched)) {
      return true;
    }
    return false;
  }


}
