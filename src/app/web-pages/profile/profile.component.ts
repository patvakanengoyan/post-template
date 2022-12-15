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
  form: any = FormGroup;
  count: number = 0;
  clickButton: boolean = true

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
      birthday: ['', Validators.compose([Validators.required])],
      nickname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.minLength(6)])],
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
    this.getUser(this.url);
  }

  getUser (url: string) {
    let headers = new HttpHeaders({
      Authorization: (localStorage.getItem('token_type') ? localStorage.getItem('token_type')  + ' ': '') + localStorage.getItem('site_access_token'),
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
      console.log(res);
    })
  }

  send() {
    if (this.count < 5) {
      this.clickButton = false;
      let value = {
        ...this.form.value,
        birthday: new Date(this.form.value.birthday).toLocaleDateString().replace(/\./g, '/')
      };
      this.requestService.createData(`${environment.webPages.registration}`, value).subscribe((res) => {
        this.router.navigate(['/sign-in']);
        this.clickButton = true;
      }, err => {
        this.count += 1;
        this.clickButton = true;
      })
    } else {
      this.clickButton = false;
      this.toastr.error('You have reached your register attempt limit. Please try again later');
    }
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
