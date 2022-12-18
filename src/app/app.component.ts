import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import localeBn from '@angular/common/locales/bn';
import {Router} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {AdminService} from "./services/admin/admin.service";

// declare gives Angular app access to ga function
// declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) public platformId: any,
    private adminService: AdminService,
  ) {
    registerLocaleData(localeBn, 'bn');
    this.adminService.autoAdminLoggedIn();

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //
    //     // console.log(event.urlAfterRedirects);
    //     gtag('config', 'UA-84699438-4', {'page_path': event.urlAfterRedirects});
    //   }
    // });

  }

  ngOnInit(): void {

    // Facebook Script
    // if (isPlatformBrowser(this.platformId)) {
    //   const tag = document.createElement('script');
    //   tag.src = 'https://connect.facebook.net/en_US/sdk.js';
    //   document.body.appendChild(tag);
    // }

    this.updateMetaData();
    // Init Facebook
    // this.initFacebookChat();
  }

  private updateMetaData() {
    // Title
    this.title.setTitle('Family Bonding Admin');

    // Meta
    this.meta.addTag({name: 'author', content: 'Softlab IT'});
    this.meta.addTag({name: 'copyright', content: 'Softlab IT'});
    this.meta.addTag({name: 'og:locale', content: 'en_US'});
    // Open Graph
    this.meta.addTag({name: 'og:site_name', content: 'Shopify Clone'});
    // Twitter
    this.meta.addTag({name: 'twitter:card', content: 'summary_large_image'});
    this.meta.addTag({name: 'twitter:site', content: '@SoftlabIT'});
    this.meta.addTag({name: 'twitter:creator', content: '@SoftlabIT'});
  }

  /**
   * INIT FACEBOOK CHAT
   */

  // private initFacebookChat() {
  //   const initParams: InitParams = {
  //     xfbml: true,
  //     version: 'v11.0'
  //   };
  //   this.facebookService.init(initParams);
  // }


}
