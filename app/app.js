import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SocketIO} from './providers/SocketIO';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [SocketIO],
  config: {}
})

export class MyApp {
  static get parameters() {
    return [[Platform]]
  }

  constructor(platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
