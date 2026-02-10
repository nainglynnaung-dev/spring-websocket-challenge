import { Routes } from '@angular/router';
import { LoginComponent } from './chat/login.component';
import { ChatComponent } from './chat/chat';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
     { path: 'chat', component: ChatComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
];
