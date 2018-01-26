import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public adMob: AdMobFree) {
    platform.ready().then(() => {

      setTimeout(() => {
        splashScreen.hide();
      }, 100);

      let bannerConfig: AdMobFreeBannerConfig = {
          isTesting: true,
          autoShow: true,
          id: 'ca-app-pub-5396418917905130/4137136894'
        };
        adMob.banner.config(bannerConfig);
        adMob.banner.prepare().then(() => {
        }).catch(e => console.log(e));

    });
  }
}
