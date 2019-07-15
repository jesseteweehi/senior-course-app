import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User, Roles } from './global/classes';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(AngularFireAuth) protected as: AngularFireAuth,
              @Inject(AngularFirestore) protected afs: AngularFirestore) {
 }

  login() {
    this.as.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.as.auth.signOut();
  }

  user() {
    return this.as.user;
  }

  get customclaims() {
    return this.as.idTokenResult;
  }


  // canRead(user: User): boolean {
  //   const allowed = ['admin', 'teacher', 'student'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // canEdit(user: User): boolean {
  //   const allowed = ['admin', 'teacher'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // canDelete(user: User): boolean {
  //   const allowed = ['admin'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // determines if user has matching role
  // private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  //   if (!user) {
  //     console.log(user);
  //     return false;
  //     }
  //   for (const role of allowedRoles) {
  //     if ( user.custom_claims[role] ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}
