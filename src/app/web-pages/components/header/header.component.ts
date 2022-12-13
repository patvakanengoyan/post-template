import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../../shared/service/request.service";
import {SocketConnectionService} from "../../../shared/service/socket-connection.service";
import {environment} from "../../../../environments/environment.prod";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() submit = new EventEmitter<string>();
  @Input() isShowSearch: boolean = true;
  searchShow: boolean =false;

  itemListType: any = [];
  settingsCountry: any = {};

  itemListCategory: any = [];
  settingsCategory: any = {};
  constructor(public requestService: RequestService,
              public fb: FormBuilder,
              private http: HttpClient,
              public router: Router) { }

  ngOnInit(): void {
    this.requestService.userName = localStorage.getItem('site_first_name');
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
  }

  logout() {
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem('site_token_type')  + ' ' + localStorage.getItem('site_access_token'),
      'Accept-Language': 'en'
    });
    this.http.post(`${environment.webPages.logout}`, {}, {headers: headers}).subscribe(() => {
      localStorage.removeItem('site_refresh_token');
      localStorage.removeItem('site_first_name');
      localStorage.removeItem('site_role');
      localStorage.removeItem('site_expires_in');
      localStorage.removeItem('site_access_token');
      localStorage.removeItem('site_id');
      localStorage.removeItem('site_token_type');
      localStorage.removeItem('site_birthday');
      localStorage.removeItem('site_last_name');
      localStorage.removeItem('site_role_name');
      localStorage.removeItem('site_email');
      localStorage.removeItem('site_image');
      this.requestService.userName = null;
      this.requestService.socketdisconnect.next(true);

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([currentUrl])
      );
    })
    // this.requestService.createData(`${environment.webPages.logout}`, '').subscribe(() => {
    //   localStorage.removeItem('site_refresh_token');
    //   localStorage.removeItem('site_first_name');
    //   localStorage.removeItem('site_role');
    //   localStorage.removeItem('site_expires_in');
    //   localStorage.removeItem('site_access_token');
    //   localStorage.removeItem('site_id');
    //   localStorage.removeItem('site_token_type');
    //   localStorage.removeItem('site_birthday');
    //   localStorage.removeItem('site_last_name');
    //   localStorage.removeItem('site_role_name');
    //   localStorage.removeItem('site_email');
    //   localStorage.removeItem('site_image');
    //   this.requestService.userName = null;
    //   this.requestService.userLastName = null;
    //   this.requestService.userEmail = null;
    //   this.requestService.userImage = null;
    //
    //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //   this.router.onSameUrlNavigation = 'reload';
    //   this.router.navigate(['/']);
    // })
  }

  closeWindow(){
    this.searchShow = !this.searchShow
  }

  searchSubmit(form: any) {
    // if (this.form.valid) {
    //     this.submit.emit(form);
    //     this.searchShow = !this.searchShow
    // }
  }
  reset() {
    // this.form.reset({
    //   title: '',
    //   description: '',
    //   country: '',
    //   city: '',
    //   tag: '',
    //   category: ''
    // });
    this.submit.emit('reset');
    this.searchShow = !this.searchShow
  }
}
