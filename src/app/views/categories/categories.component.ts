import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {editorConfig} from "../../shared/ckEditorConfig/ck-editor-config";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  url: any = `${environment.admin.category}`;
  data: any;
  viewData: any;
  form: any = FormGroup;
  @Input() config = editorConfig;
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  isModalShown = false;
  requestType: any;
  paginationConfig: any;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getData(this.url);
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: [''],
    })
  }

  getData(url) {
    this.requestService.getData(url).subscribe((res) => {
      this.data = res['data'] ? res['data'] : [];
      this.paginationConfig = res;
    })
  }

  getById(url, id) {
    this.requestService.getData(url + '/' + id ).subscribe((res) => {
      this.viewData = res[0];
      if (this.requestType == 'edit') {
        this.form.patchValue({
          title: this.viewData.title,
          status: this.viewData.status
        })
      }
    })
  }

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

  hideModal(): void {
    this.autoShownModal?.hide();
    this.form.reset();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  onSubmit(form: any){
    let data = {
      "title":form.title,
      "translations":{
        "en":{"title":"new new Category title"},
        "hy":{"title":"new new Category title For Hy"}
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

  deleteItem(id) {
    this.modal.modalRef.hide();
    this.requestService.delete(this.url, id).subscribe((res) => {
      this.getData(this.url);
      this.hideModal();
    })
  }
}
