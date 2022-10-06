import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {HomeComponent} from "./web-pages/home/home.component";
import {NotfoundComponent} from "./web-pages/notfound/notfound.component";
import {SinglePostComponent} from "./web-pages/single-post/single-post.component";
import {AboutComponent} from "./web-pages/about/about.component";
import {ContactComponent} from "./web-pages/contact/contact.component";
import {HeaderComponent} from "./web-pages/components/header/header.component";
import {FooterComponent} from "./web-pages/components/footer/footer.component";
import {RefreshTokenService} from "./shared/service/refresh-token.service";
import {AppInterceptor} from "./shared/service/app-interceptor";
import {RequestService} from "./shared/service/request.service";
import {ToastrModule} from "ngx-toastr";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
    HomeComponent,
    NotfoundComponent,
    SinglePostComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
      AngularMultiSelectModule,
      HttpClientModule,
      ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
  ],
  providers: [
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy,
    // },
    // {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenService, multi: true },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
