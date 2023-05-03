import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionComponent } from './discussion/discussion.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'discussion/:name', component: DiscussionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:email', component: ProfileComponent },
  { path: 'search/:genre', component: SearchComponent},
  { path: 'search', component: SearchComponent},
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
