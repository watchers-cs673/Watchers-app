import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { HomeComponent } from './home/home.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscussionComponent,
    HomeComponent,
    StarRatingComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-ts3jighkzj45hmbh.us.auth0.com',
      clientId: 'gsH4yqrIkaQstcBdTqtsuXh4tROe74m3',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
