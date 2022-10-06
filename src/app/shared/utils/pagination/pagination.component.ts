import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() data;
  @Output() newItemEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  pageChanged(page) {
    this.newItemEvent.emit(this.data.url + '?page=' + page.page);
  }
}
