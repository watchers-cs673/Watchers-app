import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionComponent } from './discussion/discussion.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
// import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
