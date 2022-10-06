import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {editorConfig} from "../../shared/ckEditorConfig/ck-editor-config";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
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

  @ViewChild('fruitInput', {static: false}) fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete!: MatAutocomplete;


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

  getById(id) {
    this.requestService.getData(this.url + '/' + id ).subscribe((res) => {
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
    let data = {
      "title":form.title,
      "translations":{
        "en":{"title":"new new Category title"},
        "hy":{"title":"new new Category title For Hy"}
      },
      "status": form.status == true || form.status == 1 ? 1 : 0
    }
    if (this.requestType == 'edit') {
      this.requestService.updateData(this.url, data, this.viewData.id ).subscribe((res) => {
        this.getData(this.url);
        this.onHidden();
      })

    } else if (this.requestType == 'add') {
      this.requestService.createData(this.url,data).subscribe((res) => {
        this.getData(this.url);
        this.onHidden();
      })
    }
  }

  deleteItem(id) {
    this.modal.modalRef.hide();
    this.requestService.delete(this.url, id ).subscribe((res) => {
      this.getData(this.url);
      this.onHidden();
    })
  }
}
