import { Component, OnInit } from '@angular/core';
import {FormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {RequestService} from "../../shared/service/request.service";
import {environment} from "../../../environments/environment.prod";
import {SocketConnectionService} from "../../shared/service/socket-connection.service";

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userList: any
  form = this.fb.group({
    message: ['']
  });
  roomId: any;
  constructor(public requestService: RequestService,
              private socketConnection: SocketConnectionService,
              public fb: FormBuilder) {
  }



  ngOnInit(): void {
    this.socketConnection.socketConnected.subscribe((connected) => {
      if (connected) {
        this.getUserList();
      }
    })
  }

  getUserList() {
    this.requestService.getData(`${environment.chat.getUserList}?skip=0&take=10&types[]=GROUP&expand_last_message=false&expand_last_message_files=false&expand_last_message_reply=false&expand_last_message_reply_files=false`, true).subscribe((res: any) => {
      this.userList = res['data']['result'];
      console.log(this.userList);
    })
  }

  joinRoom(roomId: string) {
    this.roomId = roomId;
    let request1 = this.requestService.getData(`${environment.chat.joinRoom}/${roomId}/join`, true).subscribe((res) => {
      this.getMessageList();
    })
  }

  getMessageList() {
    this.requestService.getData(`${environment.chat.joinRoom}/${this.roomId}/message/list?skip=0&take=2&expand_files=false&expand_reply=false&expand_reply_files=false&expand_recipients=false`, true).subscribe((res) => {
      console.log(res);
    })
  }

  send() {
    let data = new FormData();
    data.append('message_content', this.form.value.message as string);
    data.append('message_type', '1');
    let val = this.form?.value?.message as string
    if (this.roomId && val.trim() != '') {
      this.requestService.createData(`${environment.chat.joinRoom}/${this.roomId}/message/create`,  data,true).subscribe((res) => {
        console.log(res)
        this.form.reset({message: ''})
      })
    }
  }

}
