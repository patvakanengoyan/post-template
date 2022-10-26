import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent implements OnInit {

  url: any = `${environment.admin.taxonomy.get}`;
  data: any;
  paginationConfig: any;
  viewData: any;
  form: any = FormGroup;
  itemId!: number;
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;
  imageValue: any;
  editImagePath: any;
  imagePath: any;
  image: any;
  file: any;
  guid: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getData(this.url + '?skip=0&limit=50&level1=Culture&level2=Actions&level3=an&filter_mode=like');
    this.form = this.fb.group({
      level1: ['', Validators.required],
      level2: ['', Validators.required],
      level3: ['', Validators.required],
      lang_code: ['', Validators.required],
    })
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'];
    })
  }

  getById(item) {
    this.form.patchValue({
      level1: item.level1,
      level2: item.level2,
      level3: item.level3,
      lang_code: item.lang_code,
    })
    this.viewData = item;
    // this.requestService.getData(this.url + '/' + id ).subscribe((res) => {
    //   this.viewData = res;
    //   this.form.patchValue({
    //     level1: res[0].first_name,
    //     level2: res[0].last_name,
    //     level3: res[0].email,
    //     lang_code: res[0].status,
    //   })
    // })
  }

  showModal(id, type, item?): void {
    this.isModalShown = true;
    this.requestType = type
    this.itemId = id;
    if (type === 'view') {
      this.getById(item)
    } else if (type === 'edit') {
      this.getById(item)
    } else if (type === 'add') {
      this.guid = '';
    } else if (type === 'add_translate') {
      this.getById(item)
      this.guid = item.guid;
    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    this.form.reset();
  }

  onSubmit(form: any) {
    let data = {
      "level1": form.level1,
      "level2": form.level2,
      "level3": form.level3,
      "lang_code": form.lang_code,
      "guid": this.guid
    }
    if (this.requestType == 'add') {
      delete data.guid;
    }
    if (this.requestType == 'edit') {
      this.requestService.updateData(this.url, data, this.itemId + '/update').subscribe((res) => {
        this.hideModal();
        this.getData(this.url + '?skip=0&limit=50&level1=Culture&level2=Actions&level3=an&filter_mode=like');
      })

    } else if (this.requestType == 'add' || this.requestType == 'add_translate') {
      this.requestService.createData(this.url + '/' + 'create', data).subscribe((res) => {
        this.hideModal();
        this.getData(this.url + '?skip=0&limit=50&level1=Culture&level2=Actions&level3=an&filter_mode=like');
      })
    }
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
    this.requestService.delete(this.url, id + '/delete').subscribe((res) => {
      this.getData(this.url + '?skip=0&limit=50&level1=Culture&level2=Actions&level3=an&filter_mode=like');
      this.hideModal();
    })
  }
}
