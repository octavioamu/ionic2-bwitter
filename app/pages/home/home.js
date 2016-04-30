import {
    Page,
    NavController
} from 'ionic-angular';
import {
    FormBuilder,
    Validators
} from 'angular2/common';
import {
    SocketIO
} from '../../providers/SocketIO';
import {
    BwittersPage
} from '../bwitters/bwitters';

@Page({
    templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
    static get parameters() {
        return [
            [NavController],
            [SocketIO],
            [FormBuilder]
        ];
    }

    constructor(nav, socketio, form) {
        this.nav = nav;
        this.socketio = socketio;
        this.username = '';
        this.loginForm = form.group({
            username: ['', Validators.required]
        });
    }

    login() {
        this.socketio.emit('bwitters:join', {
            user: this.username
        });
        // ##### Adicionar esta linha
        this.nav.push(BwittersPage, {
            username: this.username
        });
    }
}
