import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {

  public url: string = environment.posts.get;
  public data: any[] = [];

  constructor(private requestService: RequestService,
              public el: ElementRef) { }

  ngOnInit(): void {
  }
  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item;
      // this.allData = item;
    })
  }

}
