import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment.prod";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: any = FormGroup;


  constructor(public requestService: RequestService,
              public fb: FormBuilder,
              public router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(form) {
    this.requestService.createData(`${environment.webPages.login}`, form).subscribe((res) => {
      console.log(res);
      for (let key in res) {
        localStorage.setItem('site_' + key, res[key]);
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    })
  }

}
