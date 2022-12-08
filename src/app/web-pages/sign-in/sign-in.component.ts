import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment.prod";
import {Router} from "@angular/router";
import { SocketConnectionService } from 'src/app/shared/service/socket-connection.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: any = FormGroup;


  constructor(public requestService: RequestService,
              public fb: FormBuilder,
              private socket: SocketConnectionService,
              public router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(form) {
    this.requestService.createData(`${environment.webPages.login}`, form).subscribe((res) => {
      for (let key in res) {
        localStorage.setItem('site_' + key, res[key]);
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.socket.connect();
      this.router.navigate(['/']);
    })
  }

}
