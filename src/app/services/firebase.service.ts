import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import {getAuth, updateProfile} from 'firebase/auth'
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilSvc: UtilsService
  ) { }

  // =============== Autentificacion ===============
  login(user: User){
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(user: any){
    const auth = getAuth();
    return updateProfile(auth.currentUser, user)
  }

  getAuthState(){
    return this.auth.authState;
  }

  async signOut(){
    await this.auth.signOut();
    this.utilSvc.routerLink('/auth');
    localStorage.removeItem('user')
  }

//========== Firestore (Base de datos) =============
  getSubCollection(path: string, subCollection: string){
    return this.db.doc(path).collection(subCollection).valueChanges({ idField:'id'});
  }

  addToSubCollection(path: string, subCollection: string, object: any){
    return this.db.doc(path).collection(subCollection).add(object);
  }

  updateDocument(path: string, object: any){
    return this.db.doc(path).update(object);
  }

  deleteDocument(path: string){
    return this.db.doc(path).delete();
  }

}
