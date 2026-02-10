import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GroupListComponent } from './group/group.list.component';
import { ChatRoomComponent } from './group/chat-room.component';
import { RegisterComponent } from './auth/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'groups', component: GroupListComponent, canActivate:[AuthGuard] },
  { path: 'chat/:id', component: ChatRoomComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

