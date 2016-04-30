import {Injectable} from 'angular2/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIO {
  constructor() {
    this.socket = io.connect('https://sleepy-journey-64316.herokuapp.com');
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  on(event, fn) {
    this.socket.on(event, fn);
  }
}
