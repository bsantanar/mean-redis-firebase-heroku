import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = this.afAuth.user;
  }

  
  loginWithEmail(username: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(username, password);
  }

  registerEmail(username: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(username, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  
}
