import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../shared/service/request.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  private url: string = `${environment.webPages.profile}`;
  public userData: any;
  public form: any = FormGroup;

  constructor(private requestService: RequestService,
              public router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,10}$/)])],
      birthday: ['', Validators.required],
      nickname: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      confirm_password: ['', Validators.minLength(6)],
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
    this.getUser(this.url);
  }

  getUser (url: string) {
    let headers = new HttpHeaders({
      Authorization: (localStorage.getItem('site_token_type') ? localStorage.getItem('site_token_type')  + ' ': '') + localStorage.getItem('site_access_token'),
      'Accept-Language': localStorage.getItem('Accept-Language') as string ? localStorage.getItem('Accept-Language') as string : 'en'
    })
    this.http.get(url, {headers: headers}).subscribe((res: any) => {
      this.userData = res;
      this.form.patchValue({
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        birthday: new Date(res.birthday).toISOString().split('T')[0],
        nickname: res.nickname,
      });
    })
  }

  send() {
    let data = new FormData();
    data.append('first_name', this.form.value.first_name);
    data.append('last_name', this.form.value.last_name);
    data.append('email', this.form.value.email);
    data.append('birthday', new Date(this.form.value.birthday).toLocaleDateString().replace(/\./g, '/'));
    data.append('nickname', this.form.value.nickname ? this.form.value.nickname : '');
    data.append('_method', 'PUT');
    if (this.form.value.password && this.form.value.confirm_password) {
      data.append('password',this.form.value.password);
      data.append('confirm_password',this.form.value.confirm_password);
    }
    let headers = new HttpHeaders({
      Authorization: (localStorage.getItem('site_token_type') ? localStorage.getItem('site_token_type')  + ' ': 'Bearer ') + localStorage.getItem('site_access_token'),
      'Accept-Language': localStorage.getItem('Accept-Language') as string ? localStorage.getItem('Accept-Language') as string : 'en'
    })
    this.http.post(this.url, data, {headers: headers}).subscribe((res) => {
      this.getUser(this.url);
      this.toastr.success(res['message']);
    })
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
    }
  }

}
