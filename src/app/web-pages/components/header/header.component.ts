import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../../shared/service/request.service";
import {SocketConnectionService} from "../../../shared/service/socket-connection.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  form: any = FormGroup;
  @Output() submit = new EventEmitter<string>();
  searchShow: boolean =false;

  itemListCountry: any = [];
  settingsCountry: any = {};

  itemListCity: any = [];
  settingsCity: any = {};

  itemListCategory: any = [];
  settingsCategory: any = {};

  itemListTag: any = [];

  constructor(public requestService: RequestService,
              private socketConnection: SocketConnectionService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: '',
      description: '',
      country: '',
      city: '',
      tag: '',
      category: ''
    })
    this.socketConnection.socketConnected.subscribe((connected) => {
      if (connected) {
        // this.getUserList();
      }
    })
    this.itemListCountry = [
      {"id":1,"itemName":"USA"},
      {"id":2,"itemName":"England"},
      {"id":3,"itemName":"France"},
    ];

    this.settingsCountry = {
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      singleSelection: true,
      text:"Select item"
    };

    this.itemListCity = [
      {"id":1,"itemName":"New York",},
      {"id":2,"itemName":"Las Vegas"},
      {"id":3,"itemName":"London"},
      {"id":4,"itemName":"Paris"},
    ];
    this.itemListCategory = [
      {"id":1,"itemName":"Business"},
      {"id":2,"itemName":"Culture"},
      {"id":3,"itemName":"Sport"},
      {"id":4,"itemName":"Food"},
      {"id":5,"itemName":"Startups"},
      {"id":6,"itemName":"Travel"},
    ];

    this.settingsCategory = {
      enableSearchFilter: true,
      selectAllText: 'Select All',
      text:"Select item"
    };
    this.itemListTag = [
      {"id":1,"itemName":"Business"},
      {"id":2,"itemName":"Culture"},
      {"id":3,"itemName":"Sport"},
      {"id":4,"itemName":"Food"},
      {"id":5,"itemName":"Startups"},
    ];
  }


  searchForm(){
    this.searchShow = !this.searchShow
  }

  searchSubmit(form: any) {
   this.submit.emit(form);
    this.searchShow = !this.searchShow
  }
  reset(form: any) {
    this.form.reset({
      title: '',
      description: '',
      country: '',
      city: '',
      tag: '',
      category: ''
    });
    this.submit.emit('reset');
    this.searchShow = !this.searchShow
  }

}
