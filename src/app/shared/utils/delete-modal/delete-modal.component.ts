import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @ViewChild('delete_template') el;
  @Output() confirmDelete = new EventEmitter<number>();
  modalRef!: BsModalRef;
  itemId!: number;
  messageDeleteConfirm;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  deleteModal(id: any, type?: string) {
    this.itemId = id;
    this.modalRef = this.modalService.show(this.el, {class: 'modal-sm'});
    this.messageDeleteConfirm = type ? type : undefined;
  }

  confirm(): void {
    this.confirmDelete.emit(this.itemId);
    if (this.messageDeleteConfirm) {
      this.decline();
    }
  }

  decline(): void {
    this.modalRef.hide();
  }


}
