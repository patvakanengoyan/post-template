import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../service/request.service";
import {environment} from "../../../../environments/environment.prod";
import {SocketConnectionService} from "../../service/socket-connection.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('login_modal') el;
  form: any = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  isModalShown = false;
  @ViewChild('autoShownModal', {static: false}) autoShownModal?: ModalDirective;
  clickButton: boolean = true

  constructor(public requestService: RequestService,
              private socket: SocketConnectionService,
              public fb: FormBuilder,
              public router: Router) {
  }

  ngOnInit(): void {
  }

  hideModal(): void {
    this.autoShownModal?.hide();
    this.isModalShown = false;
  }

  onHidden(): void {
    this.isModalShown = false;
    this.form.reset();
  }

  showModal(): void {
    this.isModalShown = true;
  }

  onSubmit() {
    this.clickButton = false;
    this.requestService.createData(`${environment.webPages.login}`, this.form.value).subscribe((res) => {
      localStorage.clear();
      for (let key in res) {
        localStorage.setItem('site_' + key, res[key]);
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      let currentUrl = this.router.url;
      this.router.navigate([currentUrl]);
      // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      //   this.router.navigate([currentUrl])
      // );
      this.socket.connect();
      this.hideModal();
      this.clickButton = true;
    }, err => {
      this.clickButton = true;
    })
  }
}
