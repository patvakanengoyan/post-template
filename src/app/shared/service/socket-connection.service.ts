import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject, Subject} from "rxjs";
import { RequestService } from './request.service';
import { A } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {
  socket: any;
  socketConnected: Subject<boolean> = new BehaviorSubject<boolean>(false);
  getWayInfo: Subject<object> = new BehaviorSubject({});
  getInfo;
  messagesList: Array<object> = [];
  messagesCount;
  refreshTokenWork: Subject<boolean> = new BehaviorSubject(false);
  constructor(private requestServise: RequestService) {

    this.refreshTokenWork.subscribe(res => {
      if (res) {
        console.log('mtav')
        this.connect();
      }
    })

   }

  getInfofunc(info) {
    this.getInfo = info;
  }

  connect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    
    this.socket = io(this.getInfo?.result?.endpoints.socket_host, {
      transports: ['websocket'],
      path: this.getInfo?.result?.endpoints.socket_path,
      query: {
        'ex-authorization': localStorage.getItem('site_access_token'),
        'ex-language': 'en',
      }
    });
    this.socket.on('connect', () => {
      localStorage.setItem('_', this.socket.id)
      this.socketConnected.next(true);    
    });
    this.socket.on('_signal', (signal_type, signal_data) => {
      if (signal_type === 106) {

        if (signal_data.message_reply_id) {
          let a = this.messagesList.filter((el: any) => el.message_id == signal_data.message_reply_id );
          if (a.length != 0) {
            if (a[0]['message_reply'] && a[0]['message_reply'].length > 0) {
              let b  = a[0]['message_reply'].filter(el1 => el1.message_id == signal_data.message_id);
              if (b.length == 0) {
                a[0]['message_reply'].unshift(signal_data);
              }
            } else {
              a[0]['message_reply'] = [signal_data];
            }
          }
        } else {
         let a = this.messagesList.filter((el: any) => el.message_id == signal_data.message_id );
          if (a.length == 0) {
            this.messagesList.unshift(signal_data);
          }
        }
    
      }
    });
  
  }

  join(id) {
    let ex_version = 'v' + this.getInfo?.result?.endpoints?.major_version + '.' + this.getInfo?.result?.endpoints?.minor_version;
    this.requestServise.getData(`${this.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/ROOM1/join`, true).subscribe(res => {
      console.log(res);
    })
  }

  getMessagesList(id){
    let ex_version = 'v' + this.getInfo?.result?.endpoints?.major_version + '.' + this.getInfo?.result?.endpoints?.minor_version;
    this.requestServise.getData(`${this.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/ROOM1/message/list?skip=0&take=999999&expand_files=false&expand_reply=true&expand_reply_files=false&expand_recipients=false`).subscribe(res => {
       if (res['data']['result'] && res['data']['result'].length > 0) {
        this.messagesList = res['data']['result'];
       }
    });
  }

}
