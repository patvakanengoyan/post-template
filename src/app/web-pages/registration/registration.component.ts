import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment.prod";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  form: any = FormGroup;
  count: number = 0;
  clickButton: boolean = true

  constructor(private requestService: RequestService,
              public router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,10}$/)])],
      birthday: ['', Validators.compose([Validators.required])],
      nickname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {validator: this.matchingPasswords('password', 'confirm_password')})
  }

  send() {
    if (this.count < 5) {
      this.clickButton = false;
      let value = {
        ...this.form.value,
        birthday: new Date('2022-10-14').toLocaleDateString().replace(/\./g, '/')
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
