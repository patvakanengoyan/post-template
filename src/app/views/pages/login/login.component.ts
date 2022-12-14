import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../../shared/service/request.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.pattern(/^([\+0-9]{9,15})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,10})$/)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  })

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private router: Router) {

  }


  login(form: object) {
    this.requestService.createData(`${environment.admin.login}`, form).subscribe((data) => {
      if (data) {
        for (let key in data) {
          localStorage.setItem(key, data[key]);
        }
        this.router.navigateByUrl(`admin/posts`);
      }
    });
  }

}
