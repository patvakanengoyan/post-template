import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {
  socket: any;
  socketConnected: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  connect() {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(environment.url, {
      transports: ['websocket'],
      path: '/experimental',
      query: {
        'ex-authorization': localStorage.getItem('socket_token'),
        'ex-language': 'en',
      }
    });
    this.socket.on('connect', () => {
      localStorage.setItem('_', this.socket.id)
      this.socketConnected.next(true);
    })
    this.socket.on('signal', (signal_type, signal_data) => {
      console.log(signal_type, signal_data)
    })
  }

}
