import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {
  socket: any;

  constructor() { }

  connect() {

  }

}
