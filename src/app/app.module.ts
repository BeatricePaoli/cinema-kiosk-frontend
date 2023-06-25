import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '.';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomSerializer } from './core/router/custom-route-serializer';
import { BookingModule } from './feature/booking/booking.module';
import { HeaderModule } from './feature/header/header.module';
import { MovieListModule } from './feature/movie-list/movie-list.module';
import { ScreenModule } from './feature/screen/screen.module';
import { TheaterListModule } from './feature/theater-list/theater-list.module';
import { TheaterModule } from './feature/theater/theater.module';

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
        strictActionSerializability: true, // TODO: Check se va messo a false
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
    ScreenModule,
    HeaderModule,
    MovieListModule,
    MovieListModule,
    BookingModule,
    TheaterListModule,
    TheaterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
