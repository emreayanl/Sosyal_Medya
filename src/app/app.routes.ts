import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { FeedComponent } from './feed/feed';
import { ProfileComponent } from './profile/profile';
import { authGuard } from './guards/auth-guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  
  { 
    path: 'feed', 
    component: FeedComponent, 
    canActivate: [authGuard] 
  },
  
  
  { 
    path: 'profile/:username', 
    component: ProfileComponent, 
    canActivate: [authGuard] 
  }
];