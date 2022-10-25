import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../service/request.service";
import {environment} from "../../../../environments/environment.prod";

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
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;

  constructor(public requestService: RequestService,
              public fb: FormBuilder) { }

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

  showModal(): void{
    this.isModalShown = true;
  }
  onSubmit () {
    this.requestService.createData(`${environment.webPages.login}`, this.form.value).subscribe((res) => {
      console.log(res);
      this.hideModal();
    })
  }
}
