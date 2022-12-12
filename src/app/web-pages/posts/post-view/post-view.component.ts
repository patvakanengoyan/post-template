import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../../shared/service/request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {SocketConnectionService} from "../../../shared/service/socket-connection.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  @ViewChild('share') com!: ElementRef;
  @ViewChild('login') loginModal;
  public url: string = environment.webPages.kids.get;
  public data: any | object = {};
  public comments: Array<object> = [];
  replyID;
  replyUserName;
  disableSend = false;
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message_content: new FormControl('', Validators.required)
  });
  public nextPreviousUrls = {
    next: '',
    previous: ''
  }
  public type: string = '';
  public redirectUrl: string = ''
  public imagePrefix: string = environment.imagePrefix;
  constructor(private requestService: RequestService,
              public activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              public router: Router,
              public socket: SocketConnectionService,
              public fb: FormBuilder) {}

  ngOnInit(): void {
    switch (this.activatedRoute.snapshot.params['type']) {
      case 'kids' : this.type = 'KidsClick'; break;
      case 'academic' : this.type = 'AcademicSearch'; break;
      case 'pieces' : this.type = 'Pieces'; break;
      case 'june2020' : this.type = 'June2020'; break;
    }
    this.redirectUrl = this.activatedRoute.snapshot.params['type'];
    this.getNextPreviousUrls();
    this.getData(`${this.url}?facet=on&q=*%3A*&start=0&rows=10&fq=type:${this.type}&fq=id:${this.activatedRoute.snapshot.params['id']}`);
    this.form.controls['name'].disable();
    this.form.controls['email'].disable();
    this.form.patchValue({
      email: localStorage.getItem('site_email'),
      name: localStorage.getItem('site_first_name')
    })
  }
  getData (url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.data = item?.response?.docs[0];
      this.data.content = this.sanitizer.bypassSecurityTrustHtml(this.data.content);
      this.socket.socketConnected.subscribe(res => {
        if (!res){
          if (localStorage.getItem('site_access_token')) {
            this.socket.connect();
          } else {
            // this.form.controls['message_content'].disable();
            // this.loginModal.showModal();
          }
        } else {
          if (localStorage.getItem('site_access_token')) {
            this.socket.join(this.data.chat_id);
          }
        }
      });
      this.socket.getMessagesList(this.data.chat_id);
    })
  }


  submit(val) {
    if (this.form.valid && localStorage.getItem('site_access_token')) {
      this.disableSend = true;
      let value = {...val};
      value.message_type = 1;
      if (this.replyID) {
        value.message_reply_id = this.replyID;
      }
      let ex_version = 'v' + this.socket?.getInfo?.result?.endpoints?.major_version + '.' + this.socket?.getInfo?.result?.endpoints?.minor_version;
      this.requestService.createData(`${this.socket?.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/${this.data.chat_id}/message/create`, value, true).subscribe(res=> {
        this.form.controls['message_content'].setValue('');
        this.replyID = undefined;
        this.replyUserName = undefined;
        this.disableSend = false;
      })
    }
    if (!localStorage.getItem('site_access_token')) {
      this.loginModal.showModal();
    }
  }
  replyComment(comment) {
    this.replyID = comment['message_id'];
    this.replyUserName = comment['message_author']['user_name'];
    this.com.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  clearReply() {
    this.replyID = undefined;
    this.replyUserName = undefined;
  }

  ngOnDestroy(): void {
    this.clearReply();
    this.socket.messagesList = [];
  }

  getNextPreviousUrls() {
    let request1 = this.requestService.getData(`${environment.posts.get}?q=*:*&start=0&rows=1&sort=id+asc&fq=id:[* TO ${this.activatedRoute.snapshot.params['id']}]&fl=id`);
    let request2 = this.requestService.getData(`${environment.posts.get}?q=*:*&start=0&rows=1&sort=id+asc&fq=id:[${this.activatedRoute.snapshot.params['id']} TO *]&fl=id`);
    forkJoin([request1, request2]).subscribe(([item1, item2]: any) => {
      this.nextPreviousUrls.previous = item1?.response?.docs[0].id;
      this.nextPreviousUrls.next = (+item2?.response?.docs[0].id + 1).toString();
    })
  }

  navigateNextPreviousPost() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['/']);
  }

}
