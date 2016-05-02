import {Page, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {SocketIO} from '../../providers/SocketIO';
import * as moment from 'moment-timezone';
import * as _ from 'lodash';

@Page({
  templateUrl: 'build/pages/bwitters/bwitters.html'
})

export class BwittersPage {
  static get parameters() {
    return [[NavParams], [FormBuilder], [SocketIO]];
  }

  constructor(navParams, form, socketio) {
    this.socketio = socketio;
    this.username = navParams.get('username');
    this.messages = [];
    this.messageForm = form.group({
      message: ['', Validators.required]
    });

    this.socketio.on('message', (msg) => {
      msg.type = 'message';
      this.messages.push(msg);
      this.messages = _.orderBy(this.messages, ['time'], ['desc']);
    });
  }

  ngOnDestroy() {
    this.socketio.emit('bwitters:leave', { user: this.username });
  }

  humanize(timestamp){
    return moment.default(timestamp).format("HH:mm A");
  };

  sendMessage() {
    let msg = {
      'type': 'message',
      'user': this.username,
      'text': this.message,
      'time': moment.now()
    };
    this.messages.push(msg);
    this.messages = _.orderBy(this.messages, ['time'], ['desc']);
    this.socketio.emit('send:message', msg);
    this.message = '';
  }
}
