import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentService } from './shared/student.service';
import { FireauthService } from './shared/fireauth.service';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { UserResolver } from './student/user.resolver';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login' , component : LoginComponent, canActivate: [AuthGuard]},
      { path: 'register' , component : RegisterComponent, canActivate: [AuthGuard]},
      { path: 'student' , component : StudentComponent, resolve: { data: UserResolver}}
    ])
  ],
  providers: [StudentService, FireauthService, AuthGuard, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
