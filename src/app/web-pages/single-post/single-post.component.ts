import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {RequestService} from "../../shared/service/request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.prod";
import { SocketConnectionService } from 'src/app/shared/service/socket-connection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  public url: string = environment.posts.get;
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
  constructor(private requestService: RequestService,
              public activatedRoute: ActivatedRoute,
              public socket: SocketConnectionService
              ) {
  }

  ngOnInit(): void {
    this.getData(this.url);
    this.form.controls['name'].disable();
    this.form.controls['email'].disable();
    this.form.patchValue({
      email: localStorage.getItem('site_email'),
      name: localStorage.getItem('site_first_name')
    })
   
    let postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.socket.socketConnected.subscribe(res => {
      if (!res){
        this.socket.connect();
      } else {
        this.socket.join(postId);
      }
    });
    this.socket.getMessagesList(postId);
  }

  getData (url: string) {
    this.requestService.getData(url + '/' + this.activatedRoute.snapshot.params['id']).subscribe((item: any) => {
      this.data = item;
    });
  }

  submit(val) {
    this.disableSend = true;
    let value = {...val};
    value.message_type = 1;
    if (this.replyID) {
      value.message_reply_id = this.replyID;
    }
    let ex_version = 'v' + this.socket?.getInfo?.result?.endpoints?.major_version + '.' + this.socket?.getInfo?.result?.endpoints?.minor_version;
    this.requestService.createData(`${this.socket?.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/ROOM1/message/create`, value, true).subscribe(res=> {
      this.form.controls['message_content'].setValue('');
      this.replyID = undefined;
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
}
