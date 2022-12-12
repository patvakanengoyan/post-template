import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {SocketConnectionService} from "../../../shared/service/socket-connection.service";

@Component({
  selector: 'app-pieces-view',
  templateUrl: './pieces-view.component.html',
  styleUrls: ['./pieces-view.component.scss']
})
export class PiecesViewComponent implements OnInit, OnDestroy {

    public url: string = environment.webPages.pieces.get;
    public data: any | object = {};
  public comments: Array<object> = [];
  @ViewChild('share') com!: ElementRef;
  replyID;
  replyUserName;
  disableSend = false;
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message_content: new FormControl('', Validators.required)
  });
    public imagePrefix: string = environment.imagePrefix;
    constructor(private requestService: RequestService,
                public activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer,
                public socket: SocketConnectionService,
                public fb: FormBuilder) {}

    ngOnInit(): void {
        this.getData(`${this.url}?facet=on&q=*%3A*&start=0&rows=1&fq=type:Pieces&fq=id:${this.activatedRoute.snapshot.params['id']}`);
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
                this.form.controls['message_content'].disable();
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

}
