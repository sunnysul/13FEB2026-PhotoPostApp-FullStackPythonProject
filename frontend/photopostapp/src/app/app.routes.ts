import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'my-posts', component: MyPostsComponent, canActivate: [authGuard] },
  { path: 'create-post', component: PostFormComponent, canActivate: [authGuard] },
  { path: 'edit-post/:id', component: PostFormComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
