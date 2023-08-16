import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { reducers } from '.';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomSerializer } from './core/router/custom-route-serializer';
import { HeaderModule } from './feature/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.keycloakApiUrl, environment.apiUrl],
        sendAccessToken: true,
      },
    }),
    HeaderModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
