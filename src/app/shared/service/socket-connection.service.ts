import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from "../../../environments/environment.prod";
import { BehaviorSubject, Subject } from "rxjs";
import { RequestService } from './request.service';
import { A } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';

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
  route;
  private observer!: IntersectionObserver;
  constructor(private requestServise: RequestService,
    private router: Router) {

    this.refreshTokenWork.subscribe(res => {
      if (res) {
        if (localStorage.getItem('site_access_token')) {
          this.connect();
        }
      }
    })

    this.requestServise.socketdisconnect.subscribe(res => {
      if (res && this.socket) {
        this.socket.disconnect();
        this.socketConnected.next(false);
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
    this.route = undefined;
    let routes = this.router.url.split('/');
    routes.forEach(res => {
      if (res == 'admin') {
        this.route = 'admin';
      }
    });

    this.socket = io(this.getInfo?.result?.endpoints.socket_host, {
      transports: ['websocket'],
      path: this.getInfo?.result?.endpoints.socket_path,
      query: {
        'ex-authorization': this.route == 'admin' ? localStorage.getItem('access_token') : localStorage.getItem('site_access_token'),
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
          let message = this.messagesList.filter((el: any) => el.message_id == signal_data.message_reply_id);
          if (message.length != 0) {
            if (message[0]['message_reply'] && message[0]['message_reply'].length > 0) {
              let messageReply = message[0]['message_reply'].filter(el1 => el1.message_id == signal_data.message_id);
              if (messageReply.length == 0) {
                message[0]['message_reply'].unshift(signal_data);
              }
            } else {
              message[0]['message_reply'] = [signal_data];
            }
          }
        } else {
          let message = this.messagesList.filter((el: any) => el.message_id == signal_data.message_id);
          if (message.length == 0) {
            this.messagesList.unshift(signal_data);
          }
        }

      } else if (signal_type === 108) {
        let message = this.messagesList.filter((el: any) => el.message_id == signal_data.message_id);
        if (message.length > 0) {
          this.messagesList = this.messagesList.filter((el: any) => el.message_id != signal_data.message_id);
        } else {
          for (let mess of this.messagesList) {
            if (mess['message_reply'] && mess['message_reply'].length > 0) {
              mess['message_reply'] = mess['message_reply'].filter((el: any) => el.message_id != signal_data.message_id);
            }
          }
        }
      }
    });

  }

  join(id) {
    let ex_version = 'v' + this.getInfo?.result?.endpoints?.major_version + '.' + this.getInfo?.result?.endpoints?.minor_version;
    this.requestServise.getData(`${this.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/${id}/join`, true).subscribe(res => {
    })
  }

  getMessagesList(id, skyp?) {
    let skyp1 = skyp ? skyp : 0;
    let ex_version = 'v' + this.getInfo?.result?.endpoints?.major_version + '.' + this.getInfo?.result?.endpoints?.minor_version;
    this.requestServise.getData(`${this.getInfo?.result?.endpoints?.host}/api/${ex_version}/room/${id}/message/list?skip=${skyp1}&take=20&expand_files=false&expand_reply=true&expand_reply_files=false&expand_recipients=false`).subscribe(res => {
      
      if (this.messagesList.length > 0) {
        if (res['data']['result'] && res['data']['result'].length > 0) {
          this.messagesList.push(...res['data']['result']);
        }
      } else {
        if (res['data']['result'] && res['data']['result'].length > 0) {
          this.messagesList = res['data']['result'];
        } else {
          this.messagesList = [];
        }
      }

      setTimeout(() => {
        if (res['data']['result'].length > 0) {
          this.observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting === true) {
              skyp1 = skyp1 + 20;
              if (res['data']['result'].length == 20) {
                this.getMessagesList(id, skyp1);
              }
              this.observer.disconnect();
            }
          }, {
            threshold: 0.75
          });
          let com = document.getElementsByClassName('comment-block');
  
          if (com) {
            this.observer.observe(com[com.length - 1]);
          }
        }
    
      }, 0);

    });
  }

}
