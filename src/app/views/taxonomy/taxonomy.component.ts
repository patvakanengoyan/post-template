import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../shared/utils/delete-modal/delete-modal.component";
import {RequestService} from "../../shared/service/request.service";
import {Taxonomy} from "../../shared/models/taxonomy";

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent implements OnInit {

  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  @ViewChild(DeleteModalComponent) private modal!: DeleteModalComponent;
  public url: string = `${environment.admin.taxonomy.get}`;
  public data: Taxonomy[] = [];
  public paginationConfig: any;
  public viewData: any;
  public form: any = FormGroup;
  private itemId!: number;
  public isModalShown: boolean = false;
  public requestType: string = '';
  private guid: any = '';

  constructor(public requestService: RequestService,
              public fb: FormBuilder) {
  }

  /*
    The callback method that is called immediately after the page is called.
   */
  ngOnInit(): void {
    this.getData(this.url);
    this.form = this.fb.group({
      level1: ['', Validators.required],
      level2: ['', Validators.required],
      level3: ['', Validators.required],
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
  getById(item) {
    this.form.patchValue({
      level1: item.level1,
      level2: item.level2,
      level3: item.level3,
    })
  }

  /*
    Method for open modal
   */
  showModal(id, type, item?): void {
    this.isModalShown = true;
    this.requestType = type;
    this.itemId = item ? item.id : null;
    this.guid = '';
    if (type === 'view') {
      this.viewData = item;
    } else if (type === 'edit') {
      this.getById(item)
    } else if (type === 'add_translate') {
      this.getById(item)
      this.guid = item.guid;
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
      "level1": form.level1,
      "level2": form.level2,
      "level3": form.level3,
      "lang_code": 'en',
      "guid": this.guid
    }
    if (this.requestType == 'add') {
      delete data['guid'];
    }
    if (this.requestType == 'edit') {
      this.requestService.updateData(this.url, data, this.itemId + '/update').subscribe((res) => {
        this.hideModal();
        this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      })

    } else if (this.requestType == 'add' || this.requestType == 'add_translate') {
      this.requestService.createData(`${this.url}/create`, data).subscribe((res) => {
        this.hideModal();
        this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      })
    }
  }

  /*
    Delete item from data
   */
  deleteItem(id) {
    this.requestService.delete(this.url, id + '/delete').subscribe((res) => {
      this.getData(`${this.url}?page=${this.paginationConfig?.current_page}`);
      this.modal.modalRef.hide();
    })
  }
}
